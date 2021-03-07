const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query }; // This is the same as reqQuery = req.query

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Replace any gt|gte|lt|lte|in with $ in front of it
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Find resources
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  }

  // Sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  // eg. queryStr -> /api/v1/schools?select=name&limit=1&page=4
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const startIndex = limit * (page - 1);
  const endIndex = page * limit;
  const totalDocs = await model.countDocuments();

  query = query.limit(limit).skip(startIndex);

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  //  executing query
  const results = await query;

  // Pagination Result
  const pagination = {};

  if (totalDocs > endIndex) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  // Create new res object and it is accessible in the controller
  res.advancedResults = {
    success: true,
    count: results.length,
    page,
    pagination,
    data: results,
  };

  next();
};

export default advancedResults;
