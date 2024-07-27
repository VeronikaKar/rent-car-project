export const selectCatalogItems = (state) => state.cars.catalog;

// Select the reference catalog data (used for filters or options)
export const selectReferenceCatalog = (state) => state.cars.refCatalog;

// Select the list of favorite autos
export const selectFavoriteCars = (state) => state.cars.favorites;

// Select a specific auto by ID (for detail view or modal)
export const selectCarDetails = (state) => state.cars.car;

// Select the current value for filters or search queries
export const selectFilterValue = (state) => state.cars.value;

// Select whether the limit for pagination is reached
export const selectPaginationLimitReached = (state) => state.cars.isLimit;

// Select the loading state for asynchronous operations
export const selectLoadingState = (state) => state.cars.isLoading;
