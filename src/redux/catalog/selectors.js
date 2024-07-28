
import { createSelector } from "reselect";


export const selectCatalogItems = (state) => state.cars.catalog;
export const selectReferenceCatalog = (state) => state.cars.refCatalog;
export const selectFavoriteCars = (state) => state.cars.favorites;
export const selectCarDetails = (state) => state.cars.car;
export const selectFilterValue = (state) => state.cars.value;
export const selectPaginationLimitReached = (state) => state.cars.isLimit;
export const selectLoadingState = (state) => state.cars.isLoading;

const getCatalogItems = (state) => state.cars.catalog;
const getFilters = (state) => state.filters;

export const selectFilteredCatalogItems = createSelector(
  [getCatalogItems, getFilters],
  (catalog, filters) => {
    if (!catalog || !Array.isArray(catalog)) return [];
    const query = filters?.query ? filters.query.toLowerCase() : "";

    return catalog.filter((item) => {
      const make = item.make ? item.make.toLowerCase() : "";
      return make.includes(query);
    });
  }
);
