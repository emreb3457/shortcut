
export const useValidate = ({ ...state }) => {
    const errors = {};

    if (state.email !== undefined && !state.email) errors.email = "Required"
    if (state.password !== undefined && !state.password) errors.password = "Required"
    if (state.name !== undefined && !state.name) errors.name = "Required"
    if (state.location !== undefined && !state.location) errors.location = "Required"
    if (state.selectUser !== undefined && !state.selectUser) errors.selectUser = "Required"
    if (state.user !== undefined && !state.user) errors.user = "Required"

    return { errors };
}