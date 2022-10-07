
const paginate = async (Model, query, options, searchField) => {
    options.limit = options.limit ? options.limit : 20
    options.page = options.page ? options.page : 1
    const keywords = []
    searchField?.map(x => keywords.push({
        [x]: {
            "$regex": query.keyword,
            "$options": 'i'
        }
    }
    ))
    const regexOr = { $or: [...keywords] }
    return Model.paginate({ ...regexOr }, options);
};
module.exports = paginate;

