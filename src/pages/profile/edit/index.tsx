import { EditProfile } from '@/components/Profile/Edit';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { type User } from '@/components/Profile/Edit';
import type { LabedItem } from '@/components/structuralComponents/ListFilter';
import { setOptions } from '@/utils/setOptions';
import { apiFetch } from '@/utils/fetchApi';
export const Route = createFileRoute('/profile/edit/')({
  component: RouteComponent,
  loader: async (): Promise<{
    user: User;
    gendersList: LabedItem[];
    cityList: LabedItem[];
    neighborhoodList: LabedItem[];
    userCityId: string | undefined;
    userNeighborhoodId: string | undefined;
}> => {
    const user: User = JSON.parse(localStorage.getItem("user")!);
    let gendersList: LabedItem[] = [];
        const storedGenders = localStorage.getItem('genders');
        if (storedGenders) gendersList = JSON.parse(storedGenders);
        if (!gendersList.length) {
        
            setOptions().then(({genders}) => {
                gendersList = genders;
            })
        };
        
    const { "0": cityList, "1": neighborhoodList } = await Promise.all([
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiFetch({ apiPath: `https://conectades.com.br/api/auth/opcoes/` }).then((data: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const cityList: LabedItem[] = data.cidades.map((item: any) => ({ id: item.id, label: item.nome }));
                return cityList;
      }), 
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiFetch({ apiPath: `https://conectades.com.br/api/auth/bairros/${user.cidade}` }).then((data: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const neighborhoodList: LabedItem[] = data.bairros.map((item: any) => ({ id: item.id, label: item.nome }));
                return neighborhoodList;
      })]);

    const userCityId = cityList.find(item => item.label === user.cidade)?.id;
    const userNeighborhoodId = neighborhoodList.find(item => item.label === user.bairro)?.id;
    
    return { user, gendersList, cityList, neighborhoodList, userCityId, userNeighborhoodId};
  }
})

function RouteComponent() {
  const {user, gendersList, cityList, neighborhoodList, userCityId, userNeighborhoodId} = useLoaderData({from: "/profile/edit/"})
  return <EditProfile userInfo={user} gendersList={gendersList} citysList={cityList} neighborhoodsList={neighborhoodList} userCityId={userCityId || ''} userNeighborhoodId={userNeighborhoodId || ''} />
}
