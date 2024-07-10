const Contact = require("../models/contactModel");

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
      filter(Contact.find(), search, status, companies)
    );
    const totalPages = Math.ceil(totalFilteredResults / limitPerPage);

    if (currentPage < 1 || currentPage > totalPages) {
      currentPage = 1;
    }

    let query = Contact.find().select({
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
    const totalCount = await Contact.countDocuments();

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
    const contact = await Contact.findById({ _id: contactId }).select({
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
  } catch (error) {
    console.log();
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
  } catch (error) {
    console.log();
  }
};
