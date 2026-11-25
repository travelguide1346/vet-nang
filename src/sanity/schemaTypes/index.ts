import type { SchemaTypeDefinition } from "sanity";
import { videoEmbedType } from "./videoEmbed";
import { reviewPostType } from "./reviewPost";
import { travelPostType } from "./travelPost";
import { commentType } from "./comment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [reviewPostType, travelPostType, videoEmbedType, commentType],
};
