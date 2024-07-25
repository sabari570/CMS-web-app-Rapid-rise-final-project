// Helper function for search filtering
module.exports.filter = (query, search, status, companies) => {
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
module.exports.sort = (query, sortFields) => {
  const sortObj = {};
  sortFields.map((field) => {
    const [key, order] = field.split(":");
    sortObj[key] = order === "desc" ? -1 : 1;
  });
  return query.sort(sortObj);
};

// Helper function for pagination
module.exports.paginate = (query, { page, limit }) => {
  const offset = (page - 1) * limit;
  return query.skip(offset).limit(limit);
};

// Helper function for extracting the totals for dashboard
module.exports.dashboardTotalsData = async (Contact, userId) => {
  // Total contacts
  const totalContacts = await Contact.countDocuments({ adminId: userId });

  // Total companies
  const companiesList = await Contact.distinct("companyName", {
    adminId: userId,
  });
  const totalCompanies = companiesList.length;

  // Total employees
  const totalEmployees = await Contact.countDocuments({
    status: "Employee",
    adminId: userId,
  });

  // Total trainees
  const totalTrainees = await Contact.countDocuments({
    status: "Trainee",
    adminId: userId,
  });

  return (totalsData = {
    totalContacts,
    totalCompanies,
    totalEmployees,
    totalTrainees,
  });
};

// Helper function to extract contacts created per month
module.exports.dashboardContactPerMonth = async (Contact, adminId) => {
  const response = await Contact.aggregate([
    // Stage 1: extracts all documents of the particular user
    {
      $match: {
        adminId: adminId,
      },
    },
    // Stage 2: Groups all the documents by createdAt field extracting the month
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    // Stage 3: Sorts the docs on the basis of the month extracted
    {
      $sort: {
        _id: 1,
      },
    },
    // Stage 4: Projects the required detials
    {
      $project: {
        month: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);
  return response;
};

module.exports.dashboardContactsByCompany = async (Contact, adminId) => {
  const response = await Contact.aggregate([
    // Stage 1: extract the documents belonging to the particular user
    {
      $match: {
        adminId: adminId,
      },
    },
    // Stage 2: Grouping the docs by company name and getting their count
    {
      $group: {
        _id: "$companyName",
        count: { $sum: 1 },
      },
    },
    // Stage 3: Renaming the _id field to month and projecting required details
    {
      $project: {
        companyName: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);
  return response;
};
