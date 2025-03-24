import { TrendingUp, Award } from 'lucide-react-native';
import { Text, View, Pressable } from 'react-native';

export const OverloadCard = ({ onPress }: { onPress: () => void }) => {
  const overloadData = {
    increasedVolume: '24%',
  };

  return (
    <Pressable onPress={onPress} className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>Progress Update</Text>
        <Award size={20} color="#000000" />
      </View>

      <View className={styles.messageContainer}>
        <TrendingUp size={20} color="#000000" />
        <Text className={styles.message}>
          Crushing it! You're up{' '}
          <Text className={styles.volume}>{overloadData.increasedVolume}</Text> this week
        </Text>
      </View>
    </Pressable>
  );
};

const styles = {
  container: `bg-white p-4 rounded-2xl shadow-sm m-2 border border-gray-200`,
  header: `flex-row items-center justify-between w-full mb-2`,
  title: `text-lg font-medium text-gray-800`,
  messageContainer: `flex-row items-center gap-2 mb-2`,
  message: `text-base text-gray-700`,
  volume: `text-2xl font-bold text-black`,
};
