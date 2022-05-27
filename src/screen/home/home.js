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
    const [open, setOpen] = useState(false);
    const [closed, setClosed] = useState(false);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        getData();
        let currentTimestamp = Date.now()
        console.log(currentTimestamp); // get current timestamp
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
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

    const selectSolicitacao = (id) => {
        if (id == 1) {
            setOpen(true)
            setClosed(false)
            setPending(false)
        } else if (id == 2) {
            setOpen(false)
            setClosed(true)
            setPending(false)
        } else {
            setOpen(false)
            setClosed(false)
            setPending(true)
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
                            <Col className="solicitacoes" md={4}>
                                {open == false ? (
                                    <div>
                                        {ptBr ? (
                                            <Button className="tipoSolicitacao" onClick={() => selectSolicitacao(1)}>Em Aberto</Button>
                                        ) : eng ? (
                                            <Button className="tipoSolicitacao" onClick={() => selectSolicitacao(1)}>Open</Button>
                                        ) : <></>}

                                    </div>
                                ) : open == true ? (

                                    dados.map((value) => {
                                        console.log(value)
                                        if (value.status === "open") {

                                            console.log(value.createdAt)

                                            let timestamps = value.createdAt;
                                            console.log(timestamps);

                                            let [data, time] = timestamps.split('T');

                                            let [ano, mes, dia] = data.split('-');
                                            let formatedDate = `${dia}/${mes}/${ano}`;


                                            let [hour, minutes] = time.split(':', 2);
                                            let formatTime = `${hour}:${minutes}`;
                                            let formatedDateTime = `${formatedDate} ${formatTime}`;

                                            console.log(formatedDateTime);

                                            return (
                                                <div key={value.id}>
                                                    {ptBr ? (
                                                        <h1>Aberto</h1>
                                                    ) : eng ? (
                                                        <h1 style={{ textTransform: "capitalize" }}>{value.status}</h1>
                                                    ) : <></>}
                                                    {ptBr ? (
                                                        <h1>Criado em:</h1>

                                                    ) : eng ? (
                                                        <h1>Created in:
                                                        </h1>
                                                    ) : <></>}

                                                    <h2>{formatedDate}</h2>
                                                    <h2>{formatTime}</h2>
                                                </div>
                                            )
                                        }
                                    })
                                ) : <></>}
                            </Col>

                            <Col className="solicitacoes" md={4}>
                                {closed == false ? (
                                    <div>
                                        {ptBr ? (
                                            <Button className="tipoSolicitacao" onClick={() => selectSolicitacao(2)}>Encerrados</Button>
                                        ) : eng ? (
                                            <Button className="tipoSolicitacao" onClick={() => selectSolicitacao(2)}>Closed</Button>
                                        ) : <></>}


                                    </div>
                                ) : closed == true ? (

                                    dados.map((value) => {
                                        console.log(value)
                                        if (value.status === "closed") {

                                            console.log(value.createdAt)

                                            let timestamps = value.createdAt;
                                            console.log(timestamps);

                                            let [data, time] = timestamps.split('T');

                                            let [ano, mes, dia] = data.split('-');
                                            let formatedDate = `${dia}/${mes}/${ano}`;


                                            let [hour, minutes] = time.split(':', 2);
                                            let formatTime = `${hour}:${minutes}`;
                                            let formatedDateTime = `${formatedDate} ${formatTime}`;

                                            console.log(formatedDateTime);

                                            return (
                                                <div key={value.id}>
                                                    {ptBr ? (
                                                        <h1>Encerrados</h1>
                                                    ) : eng ? (
                                                        <h1 style={{ textTransform: "capitalize" }}>{value.status}</h1>
                                                    ) : <></>}
                                                    {ptBr ? (
                                                        <h1>Criado em:</h1>

                                                    ) : eng ? (
                                                        <h1>Created in:
                                                        </h1>
                                                    ) : <></>}

                                                    <h2>{formatedDate}</h2>
                                                    <h2>{formatTime}</h2>
                                                </div>
                                            )
                                        }
                                    })
                                ) : <></>}
                            </Col>

                            <Col className="solicitacoes" md={4}>
                                {pending == false ? (
                                    <div>
                                        {ptBr ? (
                                            <Button className="tipoSolicitacao" onClick={() => selectSolicitacao(3)}>Pendentes</Button>
                                        ) : eng ? (
                                            <Button className="tipoSolicitacao" onClick={() => selectSolicitacao(3)}>Pending</Button>
                                        ) : <></>}

                                    </div>
                                ) : pending == true ? (

                                    dados.map((value) => {
                                        console.log(value)
                                        if (value.status === "pending") {

                                            console.log(value.createdAt)

                                            let timestamps = value.createdAt;
                                            console.log(timestamps);

                                            let [data, time] = timestamps.split('T');

                                            let [ano, mes, dia] = data.split('-');
                                            let formatedDate = `${dia}/${mes}/${ano}`;


                                            let [hour, minutes] = time.split(':', 2);
                                            let formatTime = `${hour}:${minutes}`;
                                            let formatedDateTime = `${formatedDate} ${formatTime}`;

                                            console.log(formatedDateTime);

                                            return (
                                                <div key={value.id}>
                                                    {ptBr ? (
                                                        <h1>Pendentes</h1>
                                                    ) : eng ? (
                                                        <h1 style={{ textTransform: "capitalize" }}>{value.status}</h1>
                                                    ) : <></>}
                                                    {ptBr ? (
                                                        <h1>Criado em:</h1>

                                                    ) : eng ? (
                                                        <h1>Created in:
                                                        </h1>
                                                    ) : <></>}

                                                    <h2>{formatedDate}</h2>
                                                    <h2>{formatTime}</h2>
                                                </div>
                                            )
                                        }
                                    })
                                ) : <></>}
                            </Col>

                        </Row>
                    </Container>
                </section>



            </section>
        </>
    )
}