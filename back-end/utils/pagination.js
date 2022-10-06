
const paginate = async (Model, query, options) => {
    return Model.paginate({ ...query }, options);
};

module.exports = paginate;