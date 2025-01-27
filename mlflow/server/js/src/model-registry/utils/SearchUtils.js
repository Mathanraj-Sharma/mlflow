import { REGISTERED_MODELS_SEARCH_NAME_FIELD } from '../constants';
import { resolveFilterValue } from '../actions';

export function getModelNameFilter(query) {
  if (query) {
    return `${REGISTERED_MODELS_SEARCH_NAME_FIELD} ilike ${resolveFilterValue(query, true)}`;
  } else {
    return '';
  }
}

export function getCombinedSearchFilter(
  query,
  // eslint-disable-nextline
) {
  let filter = '';
  if (query.includes('tags.')) {
    filter = query;
  } else {
    filter = getModelNameFilter(query);
  }
  return filter;
}

export function constructSearchInputFromURLState(urlState) {
  if ('searchInput' in urlState) {
    return urlState['searchInput'];
  }
  if ('nameSearchInput' in urlState && 'tagSearchInput' in urlState) {
    return getModelNameFilter(urlState['nameSearchInput']) + ` AND ` + urlState['tagSearchInput'];
  }
  if ('tagSearchInput' in urlState) {
    return urlState['tagSearchInput'];
  }
  if ('nameSearchInput' in urlState) {
    return urlState['nameSearchInput'];
  }
  return '';
}
