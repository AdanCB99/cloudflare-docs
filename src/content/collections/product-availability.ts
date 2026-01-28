import { z } from "astro/zod";

import { middlecacheLoader } from "../../util/custom-loaders";
import type { CollectionConfig } from "astro/content/config";

const productAvailabilityCollectionSchema = z.string().nullable();

const productAvailabilityCollectionConfig: CollectionConfig<
	typeof productAvailabilityCollectionSchema
> = {
	loader: middlecacheLoader("v1/products/availability_certification.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);
			const lookup: Record<string, string | null> = {};

			for (const item of data) {
				lookup[item.name] = item.availability;
			}

			return lookup;
		},
	}),
	schema: productAvailabilityCollectionSchema,
};

export {
	productAvailabilityCollectionConfig,
	productAvailabilityCollectionSchema,
};
