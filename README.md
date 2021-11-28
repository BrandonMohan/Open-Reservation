# Open-Reservation

Live link: https://open-reservation.herokuapp.com/ Please refer to Wiki pages for further documentation.

# About the site
* Open Reservation is loosely based of Open Table. You can browse restaurants and view their corresponding reviews to help decide where to eat. Recently visited a restauarant and would like to leave some feedback? Find the restaurant and leave a review! Are you a restaurant owner? Add your restaurant to the site to be found by our thousands of users!

# Development
* To start the development environment:
  1. Clone the repository
  2. Run npm install from the backend folder.
  3. Use the command npm start to launch the backend server.
  4. Run npm install from the frontend folder
  5. Use the command npm start to launch the frontend server

# Technologies implemented
* Javascript
* HTML/CSS
* Node.js
* Express
* Postgres
* Sequelize
* React
* Redux

# Formik form implementation with Yup validation. Includes AWS for logo upload.
``` onst formik = useFormik({
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
      logo: yup.mixed().required('Logo is required, please add an image!'),
    }),
    onSubmit: async (values) => {
      dispatch(addOneRestaurant(values)).then(() =>
      dispatch(allRestaurants())
      )
      dispatch(hideModal());
    },
  });
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
```


# Screenshots
![chrome_vg7W9HEP12](https://user-images.githubusercontent.com/61606838/143067690-e01e21cb-7c88-42ce-879e-2496e7d703c1.png)

![chrome_clf5ggjBqd](https://user-images.githubusercontent.com/61606838/143067692-68332dfb-7188-4dd3-b979-5b1397617966.png)

![chrome_TDcbQIsnio](https://user-images.githubusercontent.com/61606838/143067693-edb4a168-05b0-4a36-a541-d67cbc1c27d9.jpg)

![chrome_Prv3ypVlIk](https://user-images.githubusercontent.com/61606838/143067694-16b39a3a-d5c6-40de-b6f7-a57c4bb7076c.png)

# Database Schema
![Open_reservation (1)](https://user-images.githubusercontent.com/61606838/143065332-31ff88f1-64be-4789-8313-d9f2c87c1eba.png)

