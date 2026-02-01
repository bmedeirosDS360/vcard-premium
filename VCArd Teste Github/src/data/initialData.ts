export interface Data {
    name: string;
    role: string;
    tagline: string;
    agency: string;
    phone: string;
    email: string;
    whatsapp: string;
    website: string;
    googleReviews: string;
    propertiesUrl: string;
    location: string;
    locationLink: string;
    avatarUrl: string;
    logoUrl: string;
    coverUrl: string;
    videoUrl: string;
    botEmbedUrl: string;
    shareUrl: string;
    carousel: string[];
    aboutTitle: string;
    aboutText: string;
    privacyText: string;
    legalText: string;
    social: {
        facebook: string;
        instagram: string;
        linkedin: string;
    };
}

export const DEFAULT_DATA: Data = {
    name: "Bruno Medeiros",
    role: "Consultor Imobiliário",
    tagline: "Mais do que imóveis, compromisso com pessoas",
    agency: "Decisões e Soluções Alverca",
    phone: "+351910000000",
    email: "bruno.medeiros@decisoesesolucoes.com",
    whatsapp: "351910000000",
    website: "https://www.grupodecisoesesolucoes.com/",
    googleReviews: "https://www.grupodecisoesesolucoes.com/",
    propertiesUrl: "https://www.grupodecisoesesolucoes.com/",
    location: "Alverca, Portugal",
    locationLink: "https://maps.app.goo.gl/exemplo",
    avatarUrl: "https://placehold.co/400x400/003B2B/C5A059?text=BM",
    logoUrl: "https://placehold.co/400x150/003B2B/C5A059?text=DS+Logo",
    coverUrl: "https://drive.google.com/file/d/18uA2pB3m5rjU4dFZ6J6Ni_Dui5A1uFIj/view?usp=sharing",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    botEmbedUrl: "https://typebot.co/vcard-x0pcsgu",
    shareUrl: "",
    carousel: [
        "https://placehold.co/600x400/003B2B/C5A059?text=Destaque+1",
        "https://placehold.co/600x400/002A24/C5A059?text=Destaque+2",
        "https://placehold.co/600x400/004137/C5A059?text=Destaque+3",
        "https://placehold.co/600x400/003B2B/FFFFFF?text=Destaque+4",
        "https://placehold.co/600x400/C5A059/003B2B?text=Destaque+5"
    ],
    aboutTitle: "Sobre Mim",
    aboutText: `Olá! O meu nome é Bruno Medeiros e sou o seu consultor de confiança na Mediação Imobiliária.

O meu foco é gerar valor para Proprietários, Investidores, Construtores e Parceiros, oferecendo um serviço estratégico e orientado para resultados. Acredito que cada negócio é uma parceria, e trabalho lado a lado com os meus clientes para maximizar o potencial de cada imóvel.

Como parte da Decisões e Soluções Alverca, ofereço muito mais do que a simples mediação. Embora a minha especialidade e foco principal seja o imobiliário, disponibilizo através da minha agência um serviço 360º que integra Intermediação de Crédito, Seguros e Obras. 

Desta forma, garanto uma solução chave-na-mão: quer precise de vender, comprar, financiar ou remodelar, tenho a estrutura certa para o apoiar.

Se procura um profissional que entenda as dinâmicas do mercado e que valoriza "Mais do que imóveis, compromisso com pessoas", encontrou o parceiro certo.

Vamos conversar sobre o seu próximo investimento ou venda?`,
    privacyText: `Política de Privacidade

O nosso Cartão de Visita Digital respeita a privacidade dos visitantes e está comprometida em proteger as informações pessoais que você pode fornecer enquanto navega no site. Esta Política de Privacidade descreve como recolhemos, usamos, compartilhamos e protegemos as suas informações pessoais.

1. Informações Recolhidas
1.1 Informações Pessoais: Podemos recolher informações pessoais, como nome, endereço de e-mail e informações de contacto, quando você interage voluntariamente connosco, como ao preencher formulários de contacto ou se inscrever em newsletters. 
1.2 Informações Automáticas: Podemos recolher automaticamente informações sobre a sua visita ao site, incluindo o seu endereço IP, navegador utilizado, páginas acessadas e data/hora de acesso. Essas informações são recolhidas pela utilização de cookies e tecnologias similares.

2. Uso de Informações 
2.1 Propósitos: As informações recolhidas podem ser utilizadas para fornecer conteúdo personalizado, melhorar o nosso site, responder a consultas, processar transações e enviar informações relevantes sobre os nossos produtos/serviços. 
2.2 Cookies: Utilizamos cookies para melhorar a experiência do usuário e recolher informações para análise. Você pode gerir as preferências de cookies nas configurações do seu navegador.

3. Partilha de Informações 
3.1 Parceiros e Fornecedores: Podemos partilhar informações com parceiros e fornecedores que nos auxiliam na operação do site e na prestação de serviços. 
3.2 Requisitos Legais: Reservamo-nos o direito de divulgar informações pessoais quando exigido por lei ou para proteger os nossos direitos legais.

4. Segurança das Informações 
4.1 Medidas de Segurança: Implementamos medidas de segurança para proteger as suas informações pessoais contra acesso não autorizado ou divulgação.

5. Links para Sites de Terceiros 
O nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade sites. Recomendamos que leia as políticas desses sites.`,
    legalText: `Aviso Legal

1. Identificação
Este Cartão Digital é propriedade de Bruno Medeiros, Consultor Imobiliário associado à Decisões e Soluções Alverca.

2. Propriedade Intelectual
Todo o conteúdo, incluindo textos, imagens e logótipos, é protegido por direitos de autor e não pode ser reproduzido sem autorização.

3. Responsabilidade
Apesar de todos os esforços para garantir a precisão da informação, não nos responsabilizamos por eventuais erros ou omissões.

4. Contacto
Para qualquer questão legal, contacte: bruno.medeiros@decisoesesolucoes.com`,
    social: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
    }
};
