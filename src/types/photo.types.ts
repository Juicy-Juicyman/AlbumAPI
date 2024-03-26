import { Photo } from "@prisma/client";

export type CreatePhoto = Omit<Photo, "id">;

export type UpdatePhoto = Partial<CreatePhoto>;
