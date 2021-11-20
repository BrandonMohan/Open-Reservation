import * as yup from "yup";


export const RestaurantSchema = yup.object().shape({
    name: yup.string().min(5).max(50).required(),
    address: yup.string().min(5).max(50).required(),
    city: yup.string().min(5).max(50).required(),
    state: yup.string().min(5).max(50).required(),
    logo: yup.string().min(5).max(256).required(),
})
