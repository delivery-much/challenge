exports.get = async (req, res, next) => {
  const { i } = req.query;

  if (!i) {
    return res.status(400).send({
      message: 'Insufficient data',
      status: 400,
    });
  }

  const iArr = i.split(',');

  if (!iArr || !iArr.length) {
    return res.status(400).send({
      message: 'Invalid data',
      status: 400,
    });
  }

  const iArrLength = iArr.length;

  if (iArrLength > 3) {
    return res.status(400).send({
      message: 'Invalid data. Please use less than 4 ingredients.',
      status: 400,
    });
  }

  const iArrSorted = iArr.sort();
  const iFormatted = iArrSorted.join(',');

  return res.status(200).send({
    message: 'TEST OK',
    status: 200,
    iFormatted,
  });
};
