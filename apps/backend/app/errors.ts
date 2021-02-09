const errors = {
    access: {
        not_found_user: {
            status: 404,
            message: '用户不存在'
        },
        password_error: {
            status: 401,
            message: '密码错误'
        }
    }
};
export default errors;