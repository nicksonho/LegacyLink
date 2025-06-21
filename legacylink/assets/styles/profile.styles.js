import { COLORS } from '@/constants/colors';

export const styles = {
    container: {
      alignItems: 'center',
      padding: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    form: {
      width: '100%',
    },
    label: {
      fontSize: 14,
      marginBottom: 4,
      marginTop: 12,
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      fontSize: 16,
    },
    button: {
      backgroundColor: COLORS.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginTop: 24,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
  };