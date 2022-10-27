import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Table, Card, CardImg, img, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../styling/Login.css';
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";

const handleSubmit = async (values, actions, dispatch, navigate) => {
    const { email, password } = values;
    dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
            navigate('/');
        })
        .catch(() => {
            console.log('error');
        })
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!")
        }),

        onSubmit: (values, actions) => {
            handleSubmit(values, actions, dispatch, navigate)
        },
    });
    // React.useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate('/login');
    //     } else if (!isLoggedIn) {
    //         toggle()
    //     }
    // }, [isLoggedIn])
    
    const clickLogin = () => {     
        if (isLoggedIn) {
            navigate('/login')
        } else {
            // alert("Hello! I am an alert box!!");
            // toggle()
            setTimeout(() => toggle() , 1500);
        }
    }

    return (
        <>
            <Row className="rowLogin">

                <Modal isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 500 }}>
                    <ModalBody style={{ color: "red" }} >
                            Login gagal. Mungkin E-mail atau Password salah!
                            {/* <Button color="secondary" onClick={toggle}>X</Button> */}
                        
                    </ModalBody>
                </Modal>

                <Col className="leftCol">
                    <div className="formlogin">
                        <div className="smallrectangle"></div>
                        <br></br>
                        <h3>Welcome Back!</h3>
                        <br></br>
                        <form onSubmit={formik.handleSubmit} method="post">
                            <Table>
                                <label>Email</label>
                                <br></br>
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    placeholder="Contoh : xyz@gmail.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <div style={{ color: "red" }}  >{formik.errors.email}</div>
                                ) : null}
                            </Table>
                            <Table>
                                <label>Password</label>
                                <br></br>
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    placeholder="Min 8 karakter"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ color: "red" }}  >{formik.errors.password}</div>
                                ) : null}
                            </Table>

                            <div>
                                {/* <button className="buttonlogin" type="submit" onClick={ () => navigate('/')} >Submit</button> */}
                                <button className="buttonlogin" type="submit" onClick={ clickLogin }>Sign In</button>
                            </div>
                            <div>
                                <p className="textsignup">Don't have an account? <a href="/register" className="textsignup">Sign Up for free</a></p>
                            </div>

                        </form>
                    </div>
                </Col>
                
                <Col className="rightCol">
                    <img class="bgImage" src="../Rectangle.jpg" alt="" />
                    {/* <Card inverse>
                        <CardImg
                            alt="Card image cap"
                            src="../Rectangle.jpg"
                            width="100%"
                            height="auto" />
                    </Card> */}
                </Col>

            </Row>
        </>
    );
};

export default Login;