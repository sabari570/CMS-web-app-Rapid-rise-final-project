const moment = require("moment");
const Contact = require("../models/contactModel");

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
    sortObj["createdAt"] = 1;
  });
  return query.sort(sortObj);
};

// Helper function for pagination
module.exports.paginate = (query, { page, limit }) => {
  const offset = (page - 1) * limit;
  return query.skip(offset).limit(limit);
};

// Helper function to get count for a specific status and time period
const getCountByStatus = async (status, matchQuery) => {
  let result;
  if (status) {
    result = await Contact.aggregate([
      { $match: { ...matchQuery, status: status } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
  } else {
    result = await Contact.aggregate([
      { $match: { ...matchQuery } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
  }
  return result[0]?.count || 0;
};

// Helper function to calculate the percentage change
const calculatePercentageChange = (currentCount, previousCount, totalCount) => {
  if (previousCount === 0) {
    return null;
  } else {
    return ((currentCount - previousCount) / totalCount) * 100;
  }
};

// Helper function to calculate the percentage change
const getPercentageChange = async (
  status,
  currentMonthQuery,
  previousMonthQuery,
  totalCount
) => {
  const currentMonthCount = await getCountByStatus(status, currentMonthQuery);
  const previousMonthCount = await getCountByStatus(status, previousMonthQuery);
  console.log({ currentMonthCount, previousMonthCount });
  return calculatePercentageChange(
    currentMonthCount,
    previousMonthCount,
    totalCount
  );
};

// Helper function for extracting the totals for dashboard
module.exports.dashboardTotalsData = async (Contact, adminId) => {
  const firstDayOfCurrentMonth = moment().startOf("month").toDate();
  const firstDayOfPreviousMonth = moment()
    .subtract(1, "months")
    .startOf("month")
    .toDate();
  const lastDayOfPreviousMonth = moment()
    .subtract(1, "months")
    .endOf("month")
    .toDate();
  // Total contacts
  const totalContacts = await Contact.countDocuments({ adminId: adminId });

  const contactsPercentageChange = await getPercentageChange(
    null,
    { adminId, createdAt: { $gte: firstDayOfCurrentMonth } },
    {
      adminId,
      createdAt: {
        $gte: firstDayOfPreviousMonth,
        $lte: lastDayOfPreviousMonth,
      },
    },
    totalContacts
  );
  console.log(
    "contacts percentage change: ",
    Math.ceil(contactsPercentageChange)
  );
  // Total companies
  const companiesList = await Contact.distinct("companyName", {
    adminId: adminId,
  });
  const totalCompanies = companiesList.length;

  // Total employees
  const totalEmployees = await Contact.countDocuments({
    status: "Employee",
    adminId: adminId,
  });

  const employeesPercentageChange = await getPercentageChange(
    "Employee",
    { adminId, createdAt: { $gte: firstDayOfCurrentMonth } },
    {
      adminId,
      createdAt: {
        $gte: firstDayOfPreviousMonth,
        $lte: lastDayOfPreviousMonth,
      },
    },
    totalEmployees
  );

  console.log(
    "employees percentage change: ",
    Math.ceil(employeesPercentageChange)
  );

  // Total trainees
  const totalTrainees = await Contact.countDocuments({
    status: "Trainee",
    adminId: adminId,
  });

  const traineesPercentageChange = await getPercentageChange(
    "Trainee",
    { adminId, createdAt: { $gte: firstDayOfCurrentMonth } },
    {
      adminId,
      createdAt: {
        $gte: firstDayOfPreviousMonth,
        $lte: lastDayOfPreviousMonth,
      },
    },
    totalTrainees
  );

  console.log(
    "trainees percentage change: ",
    Math.ceil(traineesPercentageChange)
  );

  return (totalsData = {
    totalContacts,
    percentangeChangeInContacts: Math.floor(contactsPercentageChange),
    totalCompanies,
    totalEmployees,
    percentageChangeInEmployees: Math.floor(employeesPercentageChange),
    totalTrainees,
    percentageChangeInTrainees: Math.floor(traineesPercentageChange),
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
