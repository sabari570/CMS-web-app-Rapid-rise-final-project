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

module.exports.getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort: sortFields = "",
      search = "",
      status = "",
      companies = "",
    } = req.query;
    console.log("URL: ", req.query);

    const currentPage = parseInt(page, 10);
    const limitPerPage = parseInt(limit, 10);

    let query = Contact.find();

    // Applying search filters
    if (search || status || companies)
      query = filter(query, search, status, companies);

    // Applying multi sorting
    if (sortFields) query = sort(query, sortFields.split(","));

    // Applying pagination
    query = paginate(query, { page: currentPage, limit: limitPerPage });

    const contacts = await query.exec();
    const totalCount = await Contact.countDocuments();
    const totalFilteredResults = await Contact.countDocuments(
      filter(Contact.find(), search, status, companies)
    );
    const totalPages = Math.ceil(totalFilteredResults / limitPerPage);

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
