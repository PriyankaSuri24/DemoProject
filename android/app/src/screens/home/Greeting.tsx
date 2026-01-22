import { Text } from "react-native";
import { styles } from '././Greetings.styles';

export default function Greeting(){
    const hour = new Date().getHours();
    let message = '';

    if (hour >= 5 && hour < 12){
        message = "Good Morning! Let's start organizing your task and budget."; 
    }else if(hour >= 12 && hour < 17){
        message = "Good Afternoon! Keep up with your plan";
    }else if(hour >= 17 && hour < 21){
        message = "Good Evening! Time to wrap up your day";
    }else{
        message = "Ready for some night planning?";
    }

    return <Text style={styles.message}>{message}</Text>
}