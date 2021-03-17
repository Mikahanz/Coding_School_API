import path from 'path';
import express from 'express';
import multer from 'multer';
import {
  getSchools,
  createSchool,
  getSchool,
  updateSchools,
  deleteSchool,
  getSchoolInRadius,
  schoolUploadPhoto,
} from '../controllers/schoolController.js';
import advancedResults from '../middleware/advancedResults.js';
import { verifyFile } from '../utils/myValidatorUtils.js';
import dotenv from 'dotenv';
import SchoolModel from '../models/SchoolModel.js';
import { protect, authorize } from '../middleware/auth.js';

dotenv.config();

// Configure destination & Filename for Photo Uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename(req, file, cb) {
    cb(
      null,
      `photo-${req.params.id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// upload using multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    verifyFile(file, cb);
  },
  limits: {
    fileSize: Number(process.env.MAX_FILE_UPLOAD),
  },
});

// Include other resource routers
import courseRouter from './courseRoutes.js';
import reviewRouter from './reviewRoutes.js';

// Express Router
const router = express.Router();

// /api/v1/schools/:id/photo
router
  .route('/:id/photo')
  .put(
    protect,
    authorize('admin', 'publisher'),
    upload.single('avatar'),
    schoolUploadPhoto
  );

// Re-route into other resource routers
router.use('/:schoolId/courses', courseRouter);

// Re-route into other resource routers
router.use('/:schoolId/reviews', reviewRouter);

// @route GET /api/v1/schools
// @route POST /api/v1/schools
router
  .route('/')
  .get(advancedResults(SchoolModel, 'courses'), getSchools)
  .post(protect, authorize('admin', 'publisher'), createSchool);

// @route GET /api/v1/schools/:id
// @route UPDATE /api/v1/schools/:id
// @route DELETE /api/v1/schools/:id
router
  .route('/:id')
  .get(getSchool)
  .put(protect, authorize('admin', 'publisher'), updateSchools)
  .delete(protect, authorize('admin', 'publisher'), deleteSchool);

// @route GET /api/v1/schools/radius/:zipcode/:distance
router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

export default router;
