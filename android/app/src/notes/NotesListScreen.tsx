import { View } from "react-native";
import DateHeader from "../common/DateHeader";
import { formatDate } from "../utils/dateFormatter";
import { getDateRangeLabel } from "../utils/dateUtils";
import { useNavigation} from "@react-navigation/native";
import { useStyles } from "./NotesListScreen.styles";
import { NotesFilter } from "../types/notesFilter";

type Props = {
    notesFilter: NotesFilter,
    setNotesFilter: React.Dispatch<React.SetStateAction<NotesFilter>>
}

export default function NotesListScreen({notesFilter,}:Props) {
    const navigation = useNavigation<any>();
    const styles = useStyles();
    const getHeaderDateLabel = () => 
        getDateRangeLabel(
            notesFilter.dateRange.from ?? undefined,
            notesFilter.dateRange.to ?? undefined
        );

    return(
        <View style = {styles.container}>
            <DateHeader
                dateLabel={formatDate(getHeaderDateLabel())}
                styles={styles}
                onAddPress={() => navigation.navigate("AddEditNote")}
                onFilterPress={() => {
                   
                }}
            />
        </View>
    );
}