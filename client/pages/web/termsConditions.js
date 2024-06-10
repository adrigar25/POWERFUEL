import React from 'react';
import {Accordion, AccordionItem, Card, CardHeader, CardBody, Divider} from "@nextui-org/react";
import BrandLogo from '@icons/BrandLogo';

const TermsConditions = () => {
    return (
        <main className='py-8 px-4 md:px-8 lg:px-16 xl:px-32 max-w-full lg:max-w-[1024px] mx-auto'>
            <section className='grid gap-5'>
                <section>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Términos y condiciones de PowerFuel</h1>
                </section>
                <section className='flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-10'>
                    <section>
                        <p>Bienvenido a PowerFuel, tu fuente confiable de alimentos y suplementos alimenticios diseñados para apoyar un estilo de vida saludable y activo. Nos complace ofrecerte una amplia gama de productos de alta calidad, cuidadosamente seleccionados para satisfacer tus necesidades nutricionales y ayudarte a alcanzar tus objetivos de bienestar. Estos Términos y Condiciones están diseñados para establecer un marco claro y transparente para el uso de nuestro sitio web y la compra de nuestros productos. Al navegar por nuestro sitio web, realizar una compra o interactuar con cualquiera de nuestras funcionalidades, reconoces que has leído, comprendido y aceptado estar sujeto a estos Términos y Condiciones. Este documento no solo cubre tus derechos y responsabilidades como usuario y cliente, sino que también describe nuestras políticas y procedimientos para garantizar una experiencia de compra segura, justa y satisfactoria. Te recomendamos que revises detenidamente cada sección para entender completamente nuestras prácticas y cómo afectan tu relación con PowerFuel. Estamos comprometidos a ofrecerte un servicio excepcional y esperamos que disfrutes de nuestros productos tanto como nosotros disfrutamos ofrecerlos.</p>
                    </section>
                    <section className='w-full lg:w-10/12 lg:mr-5 flex justify-center items-center mt-5 lg:mt-0'>
                        <BrandLogo />
                    </section>
                </section>
            </section>
            <Accordion selectionMode="multiple" className='px-2 md:px-4 lg:px-10 py-5'>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">1. General</h3>}>
                    <section className="grid gap-2 p-2">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">1.1 Propiedad del Sitio Web</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Este sitio web es operado por PowerFuel. En todo el sitio, los términos "nosotros", "nos" y "nuestro" se refieren a PowerFuel.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">1.2 Modificación de Términos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de estos Términos y Condiciones mediante la publicación de actualizaciones y/o cambios en nuestro sitio web. Es tu responsabilidad revisar esta página periódicamente para estar al tanto de cualquier cambio.</p>
                            </CardBody>
                        </Card>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">2. Productos y Servicios</h3>}>
                    <section className="grid gap-2 p-2">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">2.1 Descripción de Productos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Hacemos todo lo posible para describir con la mayor precisión posible los productos disponibles en nuestro sitio. Sin embargo, no garantizamos que las descripciones de productos, imágenes u otros contenidos sean exactos, completos, confiables, actuales o libres de errores.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">2.2 Disponibilidad de Productos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Nos reservamos el derecho de limitar las ventas de nuestros productos o servicios a cualquier persona, región geográfica o jurisdicción. Podemos ejercer este derecho caso por caso.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">2.3 Precios</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Todos los precios de nuestros productos están sujetos a cambios sin previo aviso. No seremos responsables ante ti ni ante terceros por cualquier modificación, cambio de precio, suspensión o interrupción del servicio.</p>
                            </CardBody>
                        </Card>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">3. Pedidos y Pagos</h3>}>
                    <section className="grid gap-2 p-2">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">3.1 Aceptación de Pedidos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Nos reservamos el derecho de rechazar cualquier pedido que realices con nosotros. Podemos, a nuestra discreción, limitar o cancelar las cantidades compradas por persona, por hogar o por pedido.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">3.2 Política de Pago</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Aceptamos diversas formas de pago, las cuales se especificarán en nuestro sitio web. Debes proporcionar información de compra y cuenta actual, completa y precisa para todas las compras realizadas en nuestra tienda.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">3.3 Errores en Pedidos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>En caso de que cometamos un error en el procesamiento de tu pedido, nos reservamos el derecho de corregirlo y de rectificar el cargo a tu cuenta de acuerdo con el precio correcto.</p>
                            </CardBody>
                        </Card>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">4. Envíos y Devoluciones</h3>}>
                    <section className="grid gap-2 p-2">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">4.1 Política de Envío</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Los tiempos de envío pueden variar según la disponibilidad de los productos y tu ubicación. Nos esforzamos por enviar los productos lo antes posible, pero no garantizamos plazos de entrega específicos.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">4.2 Política de Devolución</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Aceptamos devoluciones de productos en un plazo de 30 días desde la fecha de compra, siempre que los productos estén sin abrir, sin usar y en su embalaje original. Los gastos de envío no son reembolsables.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">4.3 Reembolsos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Una vez recibida e inspeccionada tu devolución, te notificaremos si tu reembolso ha sido aprobado o rechazado. Si se aprueba, se procesará automáticamente un crédito en tu método original de pago en un tiempo determinado.</p>
                            </CardBody>
                        </Card>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">5. Uso del Sitio Web</h3>}>
                    <section className="grid gap-2 p-2">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">5.1 Propiedad Intelectual</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, clips de audio y software, es propiedad de PowerFuel o de sus proveedores de contenido y está protegido por las leyes de derechos de autor.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">5.2 Uso Permitido</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Se te concede una licencia limitada para acceder y hacer un uso personal de este sitio web, pero no para descargar (salvo caché de página) o modificarlo, o cualquier parte de él, excepto con el consentimiento expreso por escrito de PowerFuel.</p>
                            </CardBody>
                        </Card>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">6. Limitación de Responsabilidad</h3>}>
                    <section className="grid gap-2 p-2">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">6.1 Uso del Sitio</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>PowerFuel no garantiza que el uso de nuestro servicio será ininterrumpido, puntual, seguro o libre de errores. No garantizamos que los resultados que se puedan obtener del uso del servicio serán exactos o confiables.</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl md:text-2xl font-bold">6.2 Responsabilidad de Productos</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>En ningún caso PowerFuel, nuestros directores, oficiales, empleados, afiliados, agentes, contratistas, internos, proveedores, prestadores de servicios o licenciantes serán responsables por cualquier lesión, pérdida, reclamo, o cualquier daño directo, indirecto, incidental, punitivo, especial o consecuente de cualquier tipo, incluyendo, sin limitación, pérdida de beneficios, pérdida de ingresos, pérdida de datos, costos de reemplazo, o cualquier daño similar, ya sea basado en contrato, agravio (incluyendo negligencia), responsabilidad estricta o de otro tipo, que surja del uso de cualquiera de los servicios o productos adquiridos utilizando el servicio, o por cualquier otra reclamación relacionada de alguna manera con el uso del servicio o cualquier producto, incluyendo, pero no limitado a, cualquier error u omisión en cualquier contenido, o cualquier pérdida o daño de cualquier tipo incurrido como resultado del uso del servicio o cualquier contenido (o producto) publicado, transmitido, o de otra manera disponible a través del servicio, incluso si se avisa de su posibilidad.</p>
                            </CardBody>
                        </Card>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">7. Ley Aplicable</h3>}>
                    <section>
                        <p>Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de España sin dar efecto a ningún principio de conflictos de ley.</p>
                    </section>
                </AccordionItem>
                <AccordionItem title={<h3 className="text-lg md:text-xl lg:text-2xl font-bold">8. Contacto</h3>}>
                    <section>
                        <p>Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos a través de contactopowerfuel@gmail.com o +34 602 24 07 48.</p>
                    </section>
                </AccordionItem>
            </Accordion>
        </main>
    )
}

export default TermsConditions;