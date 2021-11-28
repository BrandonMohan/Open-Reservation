import { useDispatch, useSelector } from "react-redux";
import { addOneRestaurant } from "../../store/restaurants";
import { hideModal } from "../../store/modal";
import { useFormik } from "formik";
import { allRestaurants } from "../../store/restaurants";
import * as yup from "yup";
import './CreateRestaurantForm.css'

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session?.user?.id);
//   const [image, setImage] = useState(null);

//   const updateFile = (e) => {
//       const file = e.target.files[0];
//       if (file) setImage(file)
//   }
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];


  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      name: "",
      logo: "",
      ownerId: userId,
    },
    validationSchema: yup.object({
      name: yup.string().min(5).max(50).required("Name must be between 5-50 characters!"),
      address: yup.string().min(5).max(50).required("Address must be between 5-50 characters!"),
      city: yup.string().min(5).max(50).required("City must be between 5-50 characters!"),
      state: yup.string().min(5).max(50).required("State must be between 5-50 characters!"),
      logo: yup.mixed().required('Logo is required!').test('format',
      'Supported formats: png, jpg, jpeg', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    }),
    onSubmit: async (values) => {
      dispatch(addOneRestaurant(values)).then(() =>
      dispatch(allRestaurants())
      )
      dispatch(hideModal());
    },
  });
  console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit}>
        <div className="modalContent">
        <div className="formField">
      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.address}
      />
      {formik.touched.address && formik.errors.address ? (
        <div className="errorText">{formik.errors.address}</div>
      ) : null}
</div>

    <div className="formField">
      <label htmlFor="city">City</label>
      <input
        id="city"
        name="city"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.city}
      />
      {formik.touched.city && formik.errors.city ? (
        <div className="errorText">{formik.errors.city}</div>
      ) : null}

    </div>

    <div className="formField">
      <label htmlFor="state">State</label>
      <input
        id="state"
        name="state"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.state}
      />
      {formik.touched.state && formik.errors.state ? (
        <div className="errorText">{formik.errors.state}</div>
      ) : null}
    </div>

<div className="formField">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="errorText">{formik.errors.name}</div>
      ) : null}
    </div>

<div className="formField">
      <label htmlFor="logo">Logo</label>
      <input id="logo" name="logo" type="file" onChange={(event) => {
  formik.setFieldValue("logo", event.currentTarget.files[0]);
}} />
      {formik.touched.logo && formik.errors.logo ? (
        <div className="errorText">{formik.errors.logo}</div>
      ) : null}

</div>
<div className="formField">
      <button className="buttonClass" type="submit">Submit</button>
      </div>
      </div>
    </form>
  );
};

export default CreateRestaurantForm;
