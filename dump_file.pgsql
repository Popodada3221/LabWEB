PGDMP      6                |            pegast    17.2    17.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    17034    pegast    DATABASE     z   CREATE DATABASE pegast WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE pegast;
                     postgres    false            �            1259    17077 	   Feedbacks    TABLE     Z   CREATE TABLE public."Feedbacks" (
    "Id" uuid,
    "UserId" uuid,
    "Content" text
);
    DROP TABLE public."Feedbacks";
       public         heap r       postgres    false            �            1259    17056    Orders    TABLE     �   CREATE TABLE public."Orders" (
    "UserId" uuid NOT NULL,
    "PriceId" uuid NOT NULL,
    "Quantity" integer NOT NULL,
    "Status" character varying(255)
);
    DROP TABLE public."Orders";
       public         heap r       postgres    false            �            1259    17035    Prices    TABLE     �   CREATE TABLE public."Prices" (
    "Id" uuid NOT NULL,
    "TourId" uuid NOT NULL,
    "Type" text NOT NULL,
    "Cost" integer NOT NULL,
    "Date" text NOT NULL,
    "Duration" integer NOT NULL
);
    DROP TABLE public."Prices";
       public         heap r       postgres    false            �            1259    17042    Tours    TABLE     �   CREATE TABLE public."Tours" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "ImagePath" text NOT NULL,
    "Location" text NOT NULL,
    "Description" text NOT NULL,
    "Cathegory" text NOT NULL
);
    DROP TABLE public."Tours";
       public         heap r       postgres    false            �            1259    17049    Users    TABLE     �   CREATE TABLE public."Users" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "SurName" text NOT NULL,
    "LastName" text NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL
);
    DROP TABLE public."Users";
       public         heap r       postgres    false            �            1259    17072    __EFMigrationsHistory    TABLE     �   CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);
 +   DROP TABLE public."__EFMigrationsHistory";
       public         heap r       postgres    false                      0    17077 	   Feedbacks 
   TABLE DATA           @   COPY public."Feedbacks" ("Id", "UserId", "Content") FROM stdin;
    public               postgres    false    222   8                 0    17056    Orders 
   TABLE DATA           M   COPY public."Orders" ("UserId", "PriceId", "Quantity", "Status") FROM stdin;
    public               postgres    false    220   �                 0    17035    Prices 
   TABLE DATA           V   COPY public."Prices" ("Id", "TourId", "Type", "Cost", "Date", "Duration") FROM stdin;
    public               postgres    false    217          	          0    17042    Tours 
   TABLE DATA           d   COPY public."Tours" ("Id", "Name", "ImagePath", "Location", "Description", "Cathegory") FROM stdin;
    public               postgres    false    218   C!       
          0    17049    Users 
   TABLE DATA           [   COPY public."Users" ("Id", "Name", "SurName", "LastName", "Email", "Password") FROM stdin;
    public               postgres    false    219   �+                 0    17072    __EFMigrationsHistory 
   TABLE DATA           R   COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
    public               postgres    false    221   w0       r           2606    17060    Orders PK_Orders 
   CONSTRAINT     c   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "PK_Orders" PRIMARY KEY ("UserId", "PriceId");
 >   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "PK_Orders";
       public                 postgres    false    220    220            k           2606    17041    Prices PK_Prices 
   CONSTRAINT     T   ALTER TABLE ONLY public."Prices"
    ADD CONSTRAINT "PK_Prices" PRIMARY KEY ("Id");
 >   ALTER TABLE ONLY public."Prices" DROP CONSTRAINT "PK_Prices";
       public                 postgres    false    217            m           2606    17048    Tours PK_Tours 
   CONSTRAINT     R   ALTER TABLE ONLY public."Tours"
    ADD CONSTRAINT "PK_Tours" PRIMARY KEY ("Id");
 <   ALTER TABLE ONLY public."Tours" DROP CONSTRAINT "PK_Tours";
       public                 postgres    false    218            o           2606    17055    Users PK_Users 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("Id");
 <   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "PK_Users";
       public                 postgres    false    219            t           2606    17076 .   __EFMigrationsHistory PK___EFMigrationsHistory 
   CONSTRAINT     {   ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");
 \   ALTER TABLE ONLY public."__EFMigrationsHistory" DROP CONSTRAINT "PK___EFMigrationsHistory";
       public                 postgres    false    221            p           1259    17071    IX_Orders_PriceId    INDEX     M   CREATE INDEX "IX_Orders_PriceId" ON public."Orders" USING btree ("PriceId");
 '   DROP INDEX public."IX_Orders_PriceId";
       public                 postgres    false    220            u           2606    17061    Orders FK_Orders_Prices_PriceId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "FK_Orders_Prices_PriceId" FOREIGN KEY ("PriceId") REFERENCES public."Prices"("Id") ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "FK_Orders_Prices_PriceId";
       public               postgres    false    4715    217    220            v           2606    17066    Orders FK_Orders_Users_UserId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "FK_Orders_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "FK_Orders_Users_UserId";
       public               postgres    false    4719    219    220               �   x���1n�1���]��`c����({���*K��o`���q����Z|��}�7�^)jA��!H�1l�-i9cq^>�k��!P����9�f.��b�H�л��0T�#�ѐ~�o������Hi�.G��
B>4'�-�{��q��O0VT8(�Y?�
��Vy�R���QJ���a-         �   x���;rD1c���	q���Ů�`E{Sh��,�(Q8��m�J�#Ӑ�Щ���1r����E��}�γb5Rm߯�=�|�E﵁���lk�&OKr��K�L-ֺ��z,�Vu�h�3g2�>�!h0���	�u��V+�c�n<z��8��*�X;UǧN!�>oN�K������;�(أ�c�����pf����9�-���o'���Q���8�o�+A��)���e�6�Ο��y� �ˠ�         -  x���O�\5�ׯO�.P��v��%`+F���]��&�h4�$� +�)8 R@�D"&\����7���YMF�E���ȿ�W_}~~p��2t���B�!�eu�ݔ
Wǂ�it�%dgo{�4{E{��Bκ���������]�_n��\�����7�sm�Գ�d_FoYR!I==x��:�����tUXS�0�1D�����o�j5(�KM��I&ň���Q�����mwÃ���ŷ�ˋ�C9m����H�'�G�]�05�i �5m����VL fl�c��Q�$���ɭ�Z+E�{��B��Ⅴ�����q�ky�����ݿ�0PXE<��7s8Jֹ�nr�1�'�����W˟�{�\�^^����v��B�b)G�x�#� >:�^�ֹ@z�=��b��������r{���t����ؠۆ!�P�tI�:R�}j!P�fI�⢇���Zq�H��XO/��O)�'t7CJ�fA��,m�CiV�Շ���֫���\~�������=i���\F�	�7�Ԯ��k������O��O������Е#�CPG�"sX;jRs��A����.���n�l��6��p�b�q΅��$>��xwYO�فB���T)�d�(6�6	Pu��U[� 9O5�����쥒�u�Z��b�mHw�ٳ�'�+qâ�E4߯� �t�EMA�*U�	� �[N�.�}�1�ebX�+d틞�p�'�6ed�3����l�t�a�.[�N?=�������Y�^lwgS"������Q�u!Y�ֿ� e�[�X����朘���lTL���b�!T*BOv�9d[y�(5�d'D��	hZ&@M�b^�����r�:���������i��y�}yi�Gv��:ݮ�����%xȇ�h�JTT�1ͭY׫�j�\�^{w�����1���Ւ��G�b��:
%R��Y�G���k0��\g�T�m:fԝ#��E���f��ʕ�}�}�j�BԕV� ��U���
�SLkJU��lp�d;UA��4H�ݷUǖ��7�}9���@���0b��l�{��~��l�c��      	   9
  x��X[o�~�~���� -wgvgv6(
$��hc��ԗ��I�"	�Ңy%_!�n�+R7��>�u�LI$�������sfI���ۃMq8s�\��oV�Yg���pe��J�*�6tBZa�Lŭ�����mٕ����u�Z��Z�� ���p�m����]ԛ[�/�E����^��R������R��ȥK�,�ʂ�2/T��4e)�Rf��L��Y�˩,s��LkÜ�&��H2kX��1o�f}�U}W������_?Y�?U������o��R?
���[w��j���cX����g�U7���l�U��nP��F�}��?���Z����ic�_�>m�C;x>���}��㏪z�=�U��:t�>��K������srvD���z>h�~�_�s�?�F|݁�{�]����j�Kd�[oC���C�o���ۭ�����qR���L�S~V!�����25&�E,,o���^-�6<�6B���k[��gk�����-���}T�H�HƑ*�M�RY��E��h��3ɵd�4F��:΅�%�f��y$8jl�]i�U��#ļSu��OZ�_�/��	�q��� �9"�ïT���ׄ�>��с��>�l���d���{��C�s�h����^���8 ����nu^��^��8����ͭ�2�Ӏ�`�W��zhup�����{�%48���?n�8�1�����U� �M��d�''�>l�#J8�ΓP� �o (����1'�L�B�Ps��ԥq�M��\ۼL�s��zu�6(|?~�<,�6Z0)�dN�t�`��2*�u���Xa�tFHgs'�؁71'2Ob#�v�o�MP|s%�[Trf�! �$��H��8 P{`1�w7ym���)%�<�s0]d��4,r�<�a��������|����P�bkmu���`T�X$x�<�]Y(k5��B'S���̈�Y''Lbt����)D�F0�
�M����F��c#w18H̳�.�x�9S�Θ�q 4H?��p7�!�A 5��)�%l@�}@�0�A�x�lQ�����?�_Y�t����|L�"�Oڎf�����_���6�F��1�!@��y���
{D��f4I.��/}2�����x� v���տ������? ��v����p�)v!��F_��B��G���fC�2r��&,�C-u��8ɓ4n}d7��W���Y��TD<����Xr��Ю(@��Y����Td��<�E'�8c�u�d���e��f�.��!�m� ���I� V�3V|�c�� M��A���4�
��
6Յ�2��q�J�B�':�T�(s���pz�:EOH��;�Et�V�ި`���<�Ll2��,��
�Jmbr\��BfƲ8�%̥yY$���L���R*ŋ<u�	ϩ�;M)�����!�J1��4�i�w���x��ػ4����B,O鉅��q8�����x�uh��m��k�]��mO��n�{��y;���C�6������Cs(Y�s�>�b�{�r!;��dꁑG�;��G�͝H�"����F?�̙DG�.��5U��k��C��%.Ƅ&�=y�F2�08��}BO��qǷ
�f
��.5L���Qgݱ�����1�% v���!u.,�oWP�ߩ}��a�C�߱���B�7<�d�Wo"�(����` �y�s�*��x
���`��|L|���6���܁F;G)�#��LO��J���ːq�M (%�1�Ɖ�F���g�R��6,�X�g�x�1�)Gdy7��W8�������9��c��ˮP �L�k�d����TF|����j? �4�)����Vg�I0>��Y�������n��	
���g��Ϟ����i�K��ԉ��1\�ha�ۇ1��օp"3�O�7~�Wu������V����{�ɒ��q�R�̔<���2V�KX�sny�@���:�%1/-�"W��DkT��1&�H���N��`A��:in`�]!���ϨΐR'�߼����n����>���48�n��!��s��11ʀ4R��� ���U��~�қ_z���4=��~q)'O���|��)��4��J��| @���@9��p��{5��(���"f�Zn�_l���4��9*/�0-L��52e�!���_��Thò��B�4���$�>1a�k�s�Ƨ��$���k�x�����}9ysNY= [���X���oH#�>�F���r����G4���9h�)�1��Nc�K�L�s����$�Qu�&���<;�xxz䤿�7"�s)�=���C��t<(F+I#��Č�rS{�4x�ϽO�W��=��~���B<��M���E[��}Nڭ[Hd�m�b�֜�\[[�0�5S+X�g���K\
р<l�Z����)�R�_��#��Rsm}w��&��H���p%l�T�L�6���1�̪�I�B�����@2!u�X��B�2���S����-�6��%�t�|W�	�%��}/z��i��9�V�̫���3ۊ^
PC�������tNX5���W�i݌IsRa��q�������k��n      
   �  x��VI��6]��b�J$E�ܕly�g��GO*��JV��(A� A�����N�H�!�Q���|�%�PK<�+ ɸ��Dii��ޝ���{z�(�WE<����Ly�3H3b	��i�,#�f�Q���I �Nci�7��j����<���Of�=e�E�3J�@B ���(P�J<�WwR���ϊ�Wq�6v�0l��f��.t�4<�qv�so�~��->����W*_�����(̇��3�����H�:[:ܦ�Z�<�� ��J̴ͬTlǹ�Yb�)���[���q}mvl��Ie�m1\��l��2,��.����r����4�/�sv('H�CeR?��C�ܫ�;=�6��i2�l�u�����m�g���~�c���&�^E��x��̟yi��%ܬzc��'�\�NѮ�t��q���ǣ&^l�:�,t[tK;t��1�r�F_3�FB�/!��W^��~�.�=?,��sՙg�\F�C]/�6�̂cR�������q,FO���kd��\m8l<�G�F���_�InTf�xt�%�kA>��^7=����ߋ��6�[5�Fj3�5��,�/�c�m���R��>��OD�+k��,�Ѽ�?��l��xOՉMo��ns�������m��ތ359<U��0Zd�$��m��EYꢝ`X��1���3�]�<?�5�����2��S�͖V�>:�XZ<~6^Fю�T�?RSv�O2��m�5<�:�4*�\��C�����ƹ�=ϫ�!�r����-җ�PT�Ae�ju�i��z��%��s�F��Z4[���s,0�]wkI�-ɮW�q�P�iȎ�cT��j�t�28mF�A���pc������fh���}-��N�8�I�l�_x��)�o��ø#]�$I��H�R��P�;�>鏮�o�/��2�Jߓ̥X(5�)�@�!���d߹�NE�Z�Y	�G�XW��@�������V��ܥ2����@J_b��)Wr<j޷�0�1ə��(�H`�'l ����p�'��#�;W��xD"(M,
�"����������_��}�����������y������r���w��2����gǛ��3�!�Á|WR1��c�i9�
�0��+¹���!���I,p��z�0�%��p\��Q�ȒKN"�=��C��ăB��y�8q�BP88L�6�y ��T���Pcm��/wg�������
,�u��x��7��L�/�2'            x������ � �     