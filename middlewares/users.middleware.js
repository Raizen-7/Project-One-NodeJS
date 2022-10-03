// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const protectToken = catchAsync(async (req, res, next) => {
	let token;
  
	if (
	  req.headers.authorization &&
	  req.headers.authorization.startsWith('Bearer')
	) {
	  token = req.headers.authorization.split(' ')[1];
	}
  
	if (!token) {
	  return next(new AppError('Session invalid', 403));
	}
  
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
	const user = await User.findOne({
	  where: { id: decoded.id, status: 'active' },
	});
  
	if (!user) {
	  return next(
		new AppError('The owner of this token is no longer available', 403)
	  );
	}
  
	req.sessionUser = user;
	next();
  });

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!user) {
		return next(new AppError('User not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.user = user;
	next();
});

module.exports = { userExists, protectToken };