import React, { useContext } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../shared/context/UserContext';
import { useDispatch } from 'react-redux';
import { performLogin, setLC } from '../shared';

export default function Login() {
    const userContext: any = useContext(UserContext);
    const dispatch = useDispatch();

    const doLogin = (fields: any) => {
        console.log('fields', fields['login']);
        console.log('fields', fields['password']);

        const loginPayload: any = {
            'login': fields['login'],
            'password': fields['password'],
            '_dynSessConf': localStorage.getItem('sessionConfNo'),
        };

        fetch('/rest/model/atg/userprofiling/ProfileActor/login', {
            method: 'post',
            body: JSON.stringify(loginPayload)
        }).then(result => {
            return result.json();
        }).then(profileData => {
            console.log(profileData);
            dispatch(performLogin());
            dispatch(setLC('00322'));
        });
    }

    return (
        <div>
            <h3>Login to {userContext['siteInfo']['siteId']}</h3>
            <Link to="/">Back To Home</Link>

            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    login: Yup.string()
                        .required('Login is required'),
                    password: Yup.string()
                        .required('Password is required')
                })}
                onSubmit={fields => {
                    doLogin(fields);
                }} >
                {props => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <Field name="login" type="text" className={'form-control' + (props.errors.login && props.touched.login ? ' is-invalid' : '')} />
                            <ErrorMessage name="login" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (props.errors.password && props.touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Sign In</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}