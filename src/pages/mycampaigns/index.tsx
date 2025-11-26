/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Navigate, useLoaderData } from '@tanstack/react-router'
import { Container } from '@/components/structuralComponents/Container';
import { MiniCard, type MiniCardItem } from '@/components/structuralComponents/MiniCard';
import { Title } from '@/components/structuralComponents/Title';
import { apiFetch } from '@/utils/fetchApi'
import styles from '../mydonations/mydonations.module.css';
import { Section } from '@/components/structuralComponents/Section';

export const Route = createFileRoute('/mycampaigns/')({
  component: RouteComponent,
  onError: () => {
    return () => <Navigate to="/login" />;
  },
  loader: async () => {
    const {access, refresh} = JSON.parse(localStorage.getItem("tokens")!);
    const myCampaigns: MiniCardItem[] = await apiFetch({
    apiPath: "https://conectades.com.br/api/token/refresh/",
    apiMethod: "POST",
    apiHeaders: {
      "Authorization": `Bearer ${access}`,
      "Content-Type": "application/json"
    },
    apiBody: { refresh: refresh }
    })
    .then((data: any) => {
      localStorage.setItem("tokens", JSON.stringify({ refresh, access: data.access }));

      return apiFetch<MiniCardItem[]>({
          apiPath: "https://conectades.com.br/api/campanhas/minhas/",
          apiHeaders: { "Authorization": `Bearer ${data.access}` }
        })
      
      // Promise.all([
      //   apiFetch({
      //     apiPath: "https://conectades.com.br/api/doacoes/independentes/minhas/",
      //     apiHeaders: { "Authorization": `Bearer ${data.access}` }
      //   }),
      //   apiFetch({
      //     apiPath: "https://conectades.com.br/api/oportunidades/minhas/",
      //     apiHeaders: { "Authorization": `Bearer ${data.access}` }
      //   })
      // ]);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  
    return { myCampaigns }
  }
})

function RouteComponent() {
  const { myCampaigns } = useLoaderData({from: "/mycampaigns/"})

  return (
    <Container classCss={styles.container}>
      <Title.Level1 text='Minhas campanhas' classCss=''/>
      <Section classCss={styles.section} aria-label='Minhas campanhas criadas'>
      {myCampaigns && myCampaigns.map((campaign: any) => {
        const card = {
          cardId: campaign.id,
          cardName: campaign.titulo,
          cardImage: campaign.imagem_url,
          cardLocation: campaign.localizacao_nome,
          cardTag: campaign.categorias_detalhadas?.find(() => true).nome,
          contribuition: campaign.doacoes.filter((donation: any) => donation.status === 'confirmada').length
        }
       return <MiniCard card={card} cardType='campaigns' key={card.cardId}/>
      })}
      </Section>
    </Container>
  )
}
