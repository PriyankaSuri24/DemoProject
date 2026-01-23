import { Pressable, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";


type props = {
    dateLabel: string;
    styles: any;
    onAddPress: () => void;
    onFilterPress: () => void;
};

export default function DateHeader({
    dateLabel,
    styles,
    onAddPress,
    onFilterPress
}: props){
    return(
        <View style={styles.dateContainer}> 
            <View style={styles.addContainer}> 
                <Text style={styles.date}>
                    {dateLabel}
                </Text> 
                <View style={styles.buttonContainer}> 
                    <Pressable
                        onPress={onAddPress}
                        style={styles.filterButtonContainer}
                    > 
                        <FontAwesome name="plus" size={25} color="#fff" />  
                    </Pressable> 
                    <Pressable
                        onPress={onFilterPress}
                        style={styles.addButtonContainer}
                    > 
                        <FontAwesome name="filter" size={25} color="#fff" /> 
                    </Pressable> 
                </View> 
            </View> 
        </View> 
    );
}