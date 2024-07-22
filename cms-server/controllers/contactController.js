const { default: mongoose } = require("mongoose");
const Contact = require("../models/contactModel");
const {
  handleContactErrors,
  handleContactCatchErrors,
} = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");

// Helper function for search filtering
const filter = (query, search, status, companies) => {
  const regex = RegExp(search, "i");

  let conditions = [];

  if (status) {
    conditions.push({ status });
  }

  if (companies && companies.length > 0) {
    companies = companies.split(",");
    conditions.push({ companyName: { $in: companies } });
  }

  if (search) {
    conditions.push({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
        { address: { $regex: regex } },
        { companyName: { $regex: regex } },
        { phone: { $regex: regex } },
      ],
    });
  }

  if (conditions.length > 0) {
    query = query.find({ $and: conditions });
  }

  return query;
};

// Helper function for sorting
const sort = (query, sortFields) => {
  const sortObj = {};
  sortFields.map((field) => {
    const [key, order] = field.split(":");
    sortObj[key] = order === "desc" ? -1 : 1;
  });
  return query.sort(sortObj);
};

// Helper function for pagination
const paginate = (query, { page, limit }) => {
  const offset = (page - 1) * limit;
  return query.skip(offset).limit(limit);
};

// controller for getting all contact details
// ==================== FETCH CONTACTS
// GET: api/contacts/fetch-contacts/
// PROTECTED
module.exports.fetchContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort: sortFields = "",
      search = "",
      status = "",
      companies = "",
    } = req.query;
    console.log("URL: ", req.query, req.userId);

    let currentPage = parseInt(page, 10);
    const limitPerPage = parseInt(limit, 10);

    const totalFilteredResults = await Contact.countDocuments(
      filter(Contact.find({ adminId: req.userId }), search, status, companies)
    );
    const totalPages = Math.ceil(totalFilteredResults / limitPerPage);

    if (currentPage < 1 || currentPage > totalPages) {
      currentPage = 1;
    }

    let query = Contact.find({ adminId: req.userId }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    // Applying search filters
    if (search || status || companies)
      query = filter(query, search, status, companies);

    // Applying multi sorting
    if (sortFields) query = sort(query, sortFields.split(","));

    // Applying pagination
    query = paginate(query, { page: currentPage, limit: limitPerPage });

    const contacts = await query.exec();
    const totalCount = await Contact.countDocuments({ adminId: req.userId });

    // Pagination result
    const pagination = {};

    if (currentPage < totalPages) {
      pagination.next = {
        page: currentPage + 1,
        limit: limitPerPage,
      };
    }

    if (currentPage > 1) {
      pagination.prev = {
        page: currentPage - 1,
        limit: limitPerPage,
      };
    }
    return res.status(200).json({
      count: contacts.length,
      page: currentPage,
      totalCount,
      totalPages,
      pagination,
      contacts,
    });
  } catch (error) {
    console.log("Error while fetching contacts: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for fetching a single contact details
// ==================== FETCH CONTACT DETAILS BY ID
// GET: api/contacts/fetch-contact/
// PROTECTED
module.exports.fetchContactById = async (req, res) => {
  try {
    const { id: contactId } = req.params;
    const contact = await Contact.find({
      _id: contactId,
      adminId: req.userId,
    }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    if (!contact)
      throw {
        statusCode: 404,
        message: `Contact with id: ${contactId} not found`,
      };

    return res.status(200).json({ contact });
  } catch (error) {
    console.log("Error while fetching a contact by id: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for creating a new contact
// ==================== CREATE A NEW CONTACT
// POST: api/contacts/create-contact/
// PROTECTED
module.exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, address, companyName, status, phone } =
      req.body;
    console.log(req.body);
    const errors = handleContactErrors(req.body);

    if (!errors.status) {
      throw errors;
    }

    let contactBody = {
      firstName,
      lastName,
      address,
      companyName,
      status,
      phone,
      adminId: req.userId,
    };

    if (req.file) {
      console.log("Contact filename: ", req.file.filename);
      contactBody.profilePic = req.file.filename;
    }

    const contact = await Contact.create(contactBody);

    return res.status(201).json({ contact });
  } catch (error) {
    console.log("Error while creating a contact: ", error);
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../uploaded_files",
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error detecting file: ", err);
          throw { statusCode: 500, message: "Error while uploading" };
        } else {
          console.log("File deleted successfully", req.file.filename);
        }
      });
    }

    if (!error.statusCode) error = handleContactCatchErrors(error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for updating a contact by id
// ==================== UPDATE CONTACT DETAILS BY ID
// PATCH: api/contacts/update-contact/:id
// PROTECTED
module.exports.updateContactById = async (req, res) => {
  try {
    const { id: contactId } = req.params;
    const updatedFields = req.body;
    const updatedData = { ...updatedFields };

    const contact = await Contact.findById(contactId);
    if (!contact)
      throw {
        statusCode: 404,
        message: `Contact with id: ${contactId} not found`,
      };

    if (req.userId != contact.adminId) {
      throw {
        statusCode: 403,
        message: "User not allowed to edit this contact",
      };
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      {
        $set: updatedData,
      },
      { new: true, runValidators: true }
    ).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.log("Error while updating a contact by id: ", error);
    if (!error.statusCode) error = handleContactCatchErrors(error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for updating the profile pic of contact
// ==================== UPDATING PROFILE PIC OF CONTACT
// PATCH: api/contacts/change-contact-avatar/:id
// PROTECTED
module.exports.changeContactAvatarById = async (req, res) => {
  try {
    const { id: contactId } = req.params;

    if (!req.file) {
      throw { statusCode: 400, message: "File is missing" };
    }
    const contact = await Contact.findById(contactId);
    if (!contact)
      throw {
        statusCode: 404,
        message: `Contact with id: ${contactId} not found`,
      };

    if (req.userId != contact.adminId) {
      throw {
        statusCode: 403,
        message: "User not allowed to edit this contact",
      };
    }

    const oldFileName = contact.profilePic;
    const newFileName = req.file.filename;
    console.log("Old filename: ", oldFileName);
    console.log("New filename: ", newFileName);

    if (!oldFileName.startsWith("default")) {
      // Remove the old file from uploads folder
      const filePath = path.join(__dirname, "../uploaded_files", oldFileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error detecting file: ", err);
          throw { statusCode: 500, message: "Error while uploading" };
        } else {
          console.log("File deleted successfully", req.file.filename);
        }
      });
    }

    // Now update the profilePic name in the database
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      {
        $set: {
          profilePic: newFileName,
        },
      },
      { new: true }
    ).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    return res.status(200).json({
      messgae: "Contact avatar changed successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.log("Error while changing the profile pic of contact: ", error);
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../uploaded_files",
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error detecting file: ", err);
          throw { statusCode: 500, message: "Error while uploading" };
        } else {
          console.log("File deleted successfully", req.file.filename);
        }
      });
    }
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for deleting a contact
// ==================== DELETING A CONTACT BY ID
// DELETE: api/contacts/delete-contact/:id
// PROTECTED
module.exports.deleteContactById = async (req, res) => {
  try {
    const { id: contactId } = req.params;

    const contact = await Contact.findById(contactId);
    if (!contact)
      throw {
        statusCode: 404,
        message: `Contact with id: ${contactId} not found`,
      };

    if (req.userId != contact.adminId) {
      throw {
        statusCode: 403,
        message: "User not allowed to delete this contact",
      };
    }

    const deletedContact = await Contact.findByIdAndDelete(contactId);
    console.log({ deletedContact });
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log("Error while deleting a contact: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for returning unique companies list
// ==================== FETCHING UNIQUE COMPANIES LIST
// GET: api/contacts/fetch-companies
// PROTECTED
module.exports.fetchCompanies = async (req, res) => {
  try {
    const companiesList = await Contact.distinct("companyName", {
      adminId: req.userId,
    });
    return res.status(200).json({ companiesList });
  } catch (error) {
    console.log("Error while fetching companies: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};
