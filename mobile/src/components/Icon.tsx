import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import FontAwesome5Icon from "@expo/vector-icons/FontAwesome5";
import OcticonIcon from "@expo/vector-icons/Octicons";
import IonIcon from "@expo/vector-icons/Ionicons";
import FoundationIcon from "@expo/vector-icons/Foundation";
import EvilIcon from "@expo/vector-icons/EvilIcons";
import SimpleLineIcon from "@expo/vector-icons/SimpleLineIcons";
import ZocialIcon from "@expo/vector-icons/Zocial";
import EntypoIcon from "@expo/vector-icons/Entypo";
import FeatherIcon from "@expo/vector-icons/Feather";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import FontistoIcon from "@expo/vector-icons/Fontisto";

type IconType =
    | "material"
    | "material-community"
    | "font-awesome"
    | "font-awesome-5"
    | "octicon"
    | "ionicon"
    | "foundation"
    | "evilicon"
    | "simple-line-icon"
    | "zocial"
    | "entypo"
    | "feather"
    | "antdesign"
    | "fontisto";

interface IconProps {
    type: IconType;
    name: string;
    size?: number;
}

const iconComponents = {
    material: MaterialIcon,
    "material-community": MaterialCommunityIcon,
    "font-awesome": FontAwesomeIcon,
    "font-awesome-5": FontAwesome5Icon,
    octicon: OcticonIcon,
    ionicon: IonIcon,
    foundation: FoundationIcon,
    evilicon: EvilIcon,
    "simple-line-icon": SimpleLineIcon,
    zocial: ZocialIcon,
    entypo: EntypoIcon,
    feather: FeatherIcon,
    antdesign: AntDesignIcon,
    fontisto: FontistoIcon,
};

function Icon(props: IconProps) {
    const { type, ...rest } = props;
    const IconComponent = iconComponents[type];
    return <IconComponent {...rest} />;
}

export { Icon };
export type { IconType, IconProps };
