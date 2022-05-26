import axios from 'axios';
import '../../style/style_home.scss';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Objetos from '../../constant/Objects';

export function Home() {
    const [dados, setDados] = useState([]);
    const [show, setShow] = useState(false);

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


    

    return (
        <section className='home'>
            <header>
                <Container>
                    <Row className="row_header">
                        <Col number={12}>
                            <span>{Objetos.logo_header}</span>
                        </Col>
                    </Row>
                </Container>
            </header>

            <main >
                <Container>
                    <Row>
                        {dados.map((dados) => {
                            console.log(dados)
                            if (dados.status === "closed") {
                                return (<h1>{dados.status}</h1>)
                            }
                        })}
                    </Row>
                </Container>
            </main>
        </section>
    )
}