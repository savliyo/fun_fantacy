import { z } from 'zod';
import { TB_match } from '../../../../../../libs/mx-schema/src';
import { slugify } from '../../../../../../libs/helpers/src';
import { InferInsertModel } from 'drizzle-orm';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';

export const transformMatchBody = (body: InferInsertModel<typeof TB_match>) => {
  return {
    ...body,
    teamOneSlug: slugify(body.teamOne),
    teamTwoSlug: slugify(body.teamTwo),
  };
};

export const MatchImageUpload = ImageUpload.fields([
  { name: 'h2hTeamImage', maxCount: 1 },
  { name: 'premiumTeamImage', maxCount: 1 },
  { name: 'teamOneLogo', maxCount: 1 },
  { name: 'teamTwoLogo', maxCount: 1 },
  { name: 'glImage', maxCount: 1 },
]);
