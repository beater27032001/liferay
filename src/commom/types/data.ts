export const DataTitle = ['Quantidade de lixo reciclado' , 'Adubo produzido' , 'Emissões de carbono evitadas'];

export type DataTitleType = typeof DataTitle[number];

export interface Data {
    id: string
    title: DataTitleType
    quantity: number
}