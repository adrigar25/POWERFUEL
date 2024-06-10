import React from "react";
import { Card, CardHeader, CardBody, Image, Spinner, CardFooter, Button, Divider } from '@nextui-org/react';
import useTitle from '@hooks/useTitle';

const InformationComponent = () => {

    useTitle('Información');
    return (
        <section className="grid my-5 mx-4 sm:mx-16 justify-center gap-5">
            <section className="flex justify-center">
                <h1 className="text-5xl">Información</h1>
            </section>
            <Card className="bg-blue-200 bg-opacity-20 p-4">
                <CardHeader className="flex gap-3 font-bold text-4xl">Preguntas Frecuentes (FAQ)</CardHeader>
                <Divider />
                <CardBody className="grid gap-4">
                        <section>
                            <h3 className="font-bold">¿Qué son los suplementos alimenticios?</h3>
                            <section>
                                <p>Los suplementos alimenticios son productos diseñados para complementar la dieta. Pueden contener vitaminas, minerales, aminoácidos, hierbas u otras plantas, enzimas y muchos otros ingredientes.</p>
                            </section>
                        </section>
                        <section>
                            <h3 className="font-bold">¿Para qué sirven los suplementos?</h3>
                            <section>
                                <p>Los suplementos pueden ayudar a asegurar que obtengas los nutrientes necesarios para mantener la salud, mejorar el rendimiento deportivo o apoyar objetivos específicos de salud.</p>
                            </section>
                        </section>
                        <section>
                            <h3 className="font-bold">¿Cómo funcionan los suplementos?</h3>
                            <section>
                                <p>Los suplementos alimenticios contienen nutrientes que ayudan a mantener la salud. Los nutrientes pueden ser vitaminas, minerales, aminoácidos, hierbas u otras plantas, enzimas y muchos otros ingredientes.</p>
                            </section>
                        </section>
                        <section>
                            <h3 className="font-bold">¿Son seguros los suplementos alimenticios?</h3>
                            <section>
                                <p>La mayoría de los suplementos son seguros si se usan según las indicaciones. Sin embargo, es importante hablar con un profesional de la salud antes de comenzar cualquier nuevo suplemento, especialmente si tienes condiciones de salud preexistentes o estás tomando otros medicamentos.</p>
                            </section>
                        </section>
                </CardBody>
            </Card>
            <Card className="bg-blue-200 bg-opacity-20 p-4">
                <CardHeader className="flex gap-3 font-bold text-4xl">Información sobre la Empresa</CardHeader>
                <Divider />
                <CardBody className="grid gap-4">
                    <section>
                        <h3 className="font-bold">¿Qué es la empresa?</h3>
                        <section>
                            <p>Somos una empresa dedicada a ofrecer suplementos alimenticios de alta calidad. Nuestro compromiso es ayudarte a alcanzar tus objetivos de salud y bienestar.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">¿Cuál es la misión de la empresa?</h3>
                        <section>
                            <p>Nuestra misión es proporcionar productos de alta calidad que apoyen la salud y el bienestar de nuestros clientes. Nos esforzamos por ofrecer un excelente servicio al cliente y una experiencia de compra excepcional.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">¿Cuáles son los valores de la empresa?</h3>
                        <section>
                            <p>Nuestros valores incluyen la integridad, la calidad, la innovación, la excelencia en el servicio al cliente y el compromiso con la salud y el bienestar de nuestros clientes.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">¿Cuál es la visión de la empresa?</h3>
                        <section>
                            <p>Nuestra visión es convertirnos en la empresa líder en la industria de los suplementos alimenticios, ofreciendo productos de alta calidad y un servicio excepcional a nuestros clientes.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">¿Cómo puedo contactar con ustedes?</h3>
                        <section>
                            <p>Puedes contactarnos a través nuestra sección de Contacto, enviando un correo a soporte@powerFuel.es, o llamándonos al [+34 654 20 33 19].</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">¿Dónde estamos ubicados?</h3>
                        <section>
                            <p>Nuestra sede se encuentra en Madrid, España. Ofrecemos envíos a nivel nacional.</p>
                        </section>
                    </section>
                </CardBody>
            </Card>
            <Card className="bg-blue-200 bg-opacity-20 p-4">
                <CardHeader className="flex font-bold text-4xl">Guías de Uso</CardHeader>
                <Divider />
                <CardBody className="grid gap-4">
                    <section>
                        <h3 className="font-bold">Diferentes tipos de suplementos</h3>
                        <section>
                            <p>Ofrecemos una variedad de suplementos, incluyendo proteínas, vitaminas, minerales, aminoácidos y productos herbales. Cada tipo de suplemento tiene sus propios beneficios y está diseñado para satisfacer diferentes necesidades nutricionales.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">Guía para principiantes</h3>
                        <section>
                            <p>Si eres nuevo en el mundo de los suplementos, te recomendamos comenzar con una multivitamina básica y luego añadir otros suplementos según tus objetivos y necesidades específicas.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">Dosificación recomendada</h3>
                        <section>
                            <p>Sigue siempre las instrucciones de dosificación en la etiqueta del producto. Si tienes dudas, consulta a un profesional de la salud.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">Consejos sobre cuándo y cómo tomar los suplementos</h3>
                        <section>
                            <p>Algunos suplementos son más efectivos cuando se toman con las comidas, mientras que otros pueden ser mejor absorbidos con el estómago vacío. Lee las instrucciones del producto para obtener la mejor guía.</p>
                        </section>
                    </section>
                    <section>
                        <h3 className="font-bold">Advertencias y Precauciones</h3>
                        <section className="mx-10">
                            <section>
                                <h4 className="font-bold">- Contraindicaciones</h4>
                                <section className="mx-3">
                                    <p>Algunos suplementos pueden no ser adecuados para personas con ciertas condiciones médicas. Lee siempre las advertencias en la etiqueta del producto y consulta a un profesional de la salud.</p>
                                </section>
                            </section>
                            <section>
                                <h4 className="font-bold">- Posibles efectos secundarios</h4>
                                <section className="mx-3">
                                    <p>Aunque los suplementos son generalmente seguros, pueden causar efectos secundarios en algunas personas. Si experimentas algún efecto adverso, deja de usar el producto y consulta a un profesional de la salud.</p>
                                </section>
                            </section>
                            <section>
                                <h4 className="font-bold">- Interacciones con medicamentos</h4>
                                <section className="mx-3">
                                    <p>Algunos suplementos pueden interactuar con medicamentos recetados o de venta libre. Consulta siempre a un profesional de la salud antes de comenzar un nuevo suplemento si estás tomando otros medicamentos.</p>
                                </section>
                            </section>
                        </section>
                    </section>
                </CardBody>
            </Card>
        </section>
    );
};

export default InformationComponent;