import axios from 'axios';
import '../../style/style_home.scss';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Objetos from '../../constant/Objects';

export function Home() {
    const [dados, setDados] = useState([]);
    const [show, setShow] = useState(false);
    const [ptBr, setPtbr] = useState(true);
    const [eng, setEng] = useState(false);
    const [language, setLanguage] = useState('Selecione o Idioma desejado!');

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let lista = [];
        axios.get('data.json', {
            headers: {},
        }).then((res) => {
            const key = Object.keys(res.data);
            const Tamanho_key = Object.keys(res.data.tickets).length;
            console.log(key)
            console.log(Tamanho_key)
            for (var i = 0; i < Tamanho_key; i++) {
                console.log(i)
                lista.push(res.data.tickets[i])
            }
            console.log(lista)
            setShow(true)
        })
        setDados(lista)
    }


    const selectLanguage = (id, value) => {
        if (id == 1) {
            setLanguage(value)
            setEng(false);
            setPtbr(true);
        } else {
            setLanguage(value)
            setEng(true);
            setPtbr(false);
        }
    }

    return (
        <>
            <section className='home'>
                <section className='header'>
                    <Container fluid>
                        <header>
                            <Row className="row_header">
                                <Col lg={6}>
                                    <span>{Objetos.logo_header}</span>
                                </Col>
                                <Col lg={6}>
                                    <select onChange={(e) => {
                                        if (e.target.value == 'Português') {
                                            selectLanguage(1, e.target.value)
                                        } else {
                                            selectLanguage(2, e.target.value)
                                        }
                                    }}>
                                        <option>{language}</option>
                                        <option value={'Português'} onChange={(value) => selectLanguage(1, value)}>Português</option>
                                        <option value={'Inglês'} onChange={(value) => selectLanguage(2, value)}>Inglês</option>
                                    </select>
                                </Col>
                            </Row>

                        </header>
                    </Container>
                </section>

                <section className="campSolicitacoes">
                    <Container>
                        <Row>
                            <Col md={4}>
                                {dados.map((value) => {
                                    console.log(value)
                                    if (value.status === "open") {
                                        return (
                                            <div key={value.id}>
                                                {ptBr ? (
                                                    <h1>Aberto</h1>
                                                ) : eng ? (
                                                    <h1>{value.status}</h1>
                                                ) : <></>}

                                                <h1>{Date(value.createdAt)}</h1>
                                            </div>
                                        )
                                    }
                                })}
                            </Col>
                            
                        </Row>
                    </Container>
                </section>



            </section>
        </>
    )
}