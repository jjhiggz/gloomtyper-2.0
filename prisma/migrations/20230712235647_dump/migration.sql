-- This is an empty migration.
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Example; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Example" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Example" OWNER TO postgres;

--
-- Name: GameText; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GameText" (
    id text NOT NULL,
    name text NOT NULL,
    content text NOT NULL
);


ALTER TABLE public."GameText" OWNER TO postgres;

--
-- Name: _CategoryToGameText; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CategoryToGameText" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_CategoryToGameText" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name) FROM stdin;
clk0d335500000g4uey1ymupr	Book Quotes
clk0d335900010g4uee0fmfjo	Jokes
clk0d335b00020g4u0a4mrc97	Jon Quotes
\.


--
-- Data for Name: Example; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Example" (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GameText; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GameText" (id, name, content) FROM stdin;
clk0d335h00030g4u1iia0u6v	Dad Joke 1	Why did the fish cross the road? Because it was running from the chicken
clk0d335n00040g4u8s8ndbr7	Mom Joke	Your mom is so cool, that she literally knows drake, and introduced you to him at a concert once.
clk0d335q00050g4u9esnv5vr	LOTR Quote 1	It's a Dangerous Business, Frodo, Going Out Your Door.
clk0d335u00060g4uxkffix26	My House isn't Your Junkyard Lyrics	My Brain's a bit f**ked up, my hearts in the right place, believe me when I say I'm trying my best. My best days are sloppy my worst days are junkyard, I'm clean but I'm dirty I have to confess. No seriously I couldn't lie to a baby but baby this curse shows that maybe you're blessed. When I met you I was all I had... So I let people treat me like a rag.
clk0d335y00070g4ukqoh76hq	My House isn't Your Junkyard Lyrics	I feel your light, but everything is black. I know you're right, where my heart is at. There's nothing wrong, with the way I'm sensing you. And I'm shooting for the moon. I'll be your puppy eyed idiot, I swear I'll keep every dirty thought of you I have so innocent. Is that your smell I want to swim in it, at least we're both in hell and we're not alone but hey I'm feeling it
\.


--
-- Data for Name: _CategoryToGameText; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CategoryToGameText" ("A", "B") FROM stdin;
clk0d335900010g4uee0fmfjo	clk0d335h00030g4u1iia0u6v
clk0d335900010g4uee0fmfjo	clk0d335n00040g4u8s8ndbr7
clk0d335500000g4uey1ymupr	clk0d335q00050g4u9esnv5vr
clk0d335900010g4uee0fmfjo	clk0d335q00050g4u9esnv5vr
clk0d335500000g4uey1ymupr	clk0d335u00060g4uxkffix26
clk0d335900010g4uee0fmfjo	clk0d335u00060g4uxkffix26
clk0d335500000g4uey1ymupr	clk0d335y00070g4ukqoh76hq
clk0d335900010g4uee0fmfjo	clk0d335y00070g4ukqoh76hq
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
83b2872f-5b8a-4c71-b9b9-60865df14318	378a08fa9fa2b4e1b8fd107c71e01189fb3c5e57dc5f07a4f2a568849f7da1ec	2023-07-12 13:20:12.477065+00	0_init		\N	2023-07-12 13:20:12.477065+00	0
\.


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Example Example_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Example"
    ADD CONSTRAINT "Example_pkey" PRIMARY KEY (id);


--
-- Name: GameText GameText_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GameText"
    ADD CONSTRAINT "GameText_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: _CategoryToGameText_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CategoryToGameText_AB_unique" ON public."_CategoryToGameText" USING btree ("A", "B");


--
-- Name: _CategoryToGameText_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CategoryToGameText_B_index" ON public."_CategoryToGameText" USING btree ("B");


--
-- Name: _CategoryToGameText _CategoryToGameText_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CategoryToGameText"
    ADD CONSTRAINT "_CategoryToGameText_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CategoryToGameText _CategoryToGameText_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CategoryToGameText"
    ADD CONSTRAINT "_CategoryToGameText_B_fkey" FOREIGN KEY ("B") REFERENCES public."GameText"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--
