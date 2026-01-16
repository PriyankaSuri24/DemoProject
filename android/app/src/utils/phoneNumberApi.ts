export const validatePhoneNumber = async (phone: string):Promise<boolean> => {
    const API_KEY = '9653609ea7da4138b27404b0cd60ca1d';
    try{
        const response = await fetch (
            `https://phoneintelligence.abstractapi.com/v1/?api_key=${API_KEY}&phone=${encodeURIComponent(phone)}`
        );
    
        if (!response.ok) {
            console.error('Phone API HTTP error', response.status);
            return false;
        }

        const data = await response.json();
        return Boolean(data?.valid);
    }catch (error){
        console.error('Phone API error', error);
        return false;
    }


}