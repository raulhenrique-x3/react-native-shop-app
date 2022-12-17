export enum Modelos {
  iphone = "https://macmagazine.com.br/wp-content/uploads/2019/10/31-logo-apple.jpg",
  samsung = "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$",
  motorola = "https://seeklogo.com/images/M/Motorola-logo-C3DDCBA822-seeklogo.com.png",
  xiaomi = "https://logosmarcas.net/wp-content/uploads/2020/05/Xiaomi-Logo.png",
  poco = "https://upload.wikimedia.org/wikipedia/commons/e/ed/Poco_Smartphone_Company_logo.png",
}

export interface IProps {
  products?: any;
  nome?: string;
  id?: number;
  capacidade?: string;
  navigation?: any;
  text?: string;
  onChangeText?: (val: string) => void;
  textInput1?: string;
  value?: React.ReactNode | any;
  route?: any;
  preco?: string;
  secureTextEntry?: boolean;
  modelo?: keyof typeof Modelos;
  iphone?: string;
  samsung?: string;
  xiaomi?: string;
  poco?: string;
  uri?: string;
}
