CREATE TABLE IF NOT EXISTS public.appointments
(
    id serial NOT NULL,
    user_id integer,
    name character varying(255) COLLATE pg_catalog."default",
    car character varying(255) COLLATE pg_catalog."default",
    service character varying(255) COLLATE pg_catalog."default",
    date date,
    status character varying(50) COLLATE pg_catalog."default",
    "time" time without time zone,
    CONSTRAINT appointments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.appointmentservices
(
    appointment_id integer NOT NULL,
    service_id integer NOT NULL,
    mechanic_id integer NOT NULL,
    CONSTRAINT appointmentservices_pkey PRIMARY KEY (appointment_id, service_id, mechanic_id)
);

CREATE TABLE IF NOT EXISTS public.blogs
(
    id integer NOT NULL DEFAULT nextval('blog_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default",
    tags character varying(255) COLLATE pg_catalog."default",
    category character varying(255) COLLATE pg_catalog."default",
    image bytea,
    content text COLLATE pg_catalog."default",
    createdat date,
    CONSTRAINT blogs_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.cars
(
    id serial NOT NULL,
    user_id integer,
    make character varying(50) COLLATE pg_catalog."default",
    model character varying(50) COLLATE pg_catalog."default",
    year integer,
    CONSTRAINT cars_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.cart
(
    id serial NOT NULL,
    user_id integer,
    name character varying(255) COLLATE pg_catalog."default",
    price numeric(10, 2),
    quantity integer,
    product_id integer,
    CONSTRAINT cart_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.orders
(
    id integer NOT NULL DEFAULT nextval('order_id_seq'::regclass),
    user_id integer,
    quantity integer,
    price numeric(10, 2),
    total numeric(10, 2),
    date date,
    status character varying(50) COLLATE pg_catalog."default",
    product_id integer,
    CONSTRAINT orders_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.payments
(
    paymentid integer NOT NULL DEFAULT nextval('payment_id_seq'::regclass),
    orderid integer,
    amount numeric(10, 2),
    paymentdate date,
    paymentstatus character varying(50) COLLATE pg_catalog."default",
    user_id integer,
    CONSTRAINT payments_pkey PRIMARY KEY (paymentid)
);

CREATE TABLE IF NOT EXISTS public.products
(
    id serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    quantity integer,
    reorder integer,
    price numeric(10, 2),
    serviceid integer,
    image bytea,
    description text COLLATE pg_catalog."default",
    category character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.services
(
    id serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    price numeric(10, 2),
    title character varying(255) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    category character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT services_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.staff
(
    id serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    role character varying(50) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    avatar bytea,
    CONSTRAINT staff_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    name character varying(225) COLLATE pg_catalog."default",
    email character varying(225) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    avatar bytea,
    createdat date,
    updatedat date,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.appointmentservices
    ADD CONSTRAINT appointmentservices_appointment_id_fkey FOREIGN KEY (appointment_id)
    REFERENCES public.appointments (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.appointmentservices
    ADD CONSTRAINT appointmentservices_mechanic_id_fkey FOREIGN KEY (mechanic_id)
    REFERENCES public.staff (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.appointmentservices
    ADD CONSTRAINT appointmentservices_service_id_fkey FOREIGN KEY (service_id)
    REFERENCES public.services (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.cars
    ADD CONSTRAINT cars_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.cart
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.orders
    ADD CONSTRAINT product_id_fkey FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.payments
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.payments
    ADD CONSTRAINT payments_orderid_fkey FOREIGN KEY (orderid)
    REFERENCES public.orders (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
