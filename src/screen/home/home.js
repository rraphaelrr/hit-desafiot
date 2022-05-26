import axios from 'axios';
import '../../style/style_login.scss';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Objetos from '../../constant/Objects';

export function Home() {
    const [showLogin, setshowLogin] = useState(true);
    const [user, setUser] = useState();
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    })

    const userValidate = (e) => {
        if (e != "" || e != null) {
            if (e.length > 5) {
                setShow(true)
            } else {
                setShow(false)
            }
        }
    }

    const passwordValidate = (e) => {
        console.log(e)

        if (e != "" || e != null) {
            if (e.length >= 8) {
                setshowLogin(false)
                setShowModal(true)

                  setTimeout(() => {
                      window.location.href = '/home'
                  }, 700);
            } else {
                setShowModal(false);
                setshowLogin(true)
            }
        }
    }



    return (
        <section className='login'>
            <header>
                <Container>
                    <Row className="row_header">
                        <Col number={12}>
                            <span>{Objetos.logo_header}</span>
                        </Col>
                    </Row>
                </Container>
            </header>

            {showLogin == true ? (
                <main className="login">
                    <Container className="campoLogin">
                        <Row>
                            <Col number={12}>
                                <h1>Hello World</h1>
                            </Col>
                        </Row>
                      

                    </Container>
                </main>
            ) : <></>}

          





        </section >
    )
}