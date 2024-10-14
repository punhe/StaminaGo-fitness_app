import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Quay lại</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Chính sách Bảo mật</Text>
        
        <Text style={styles.sectionHeader}>1. Thu thập thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi thu thập thông tin cá nhân như tên, email, và dữ liệu sức khỏe khi bạn sử dụng ứng dụng. 
          Thông tin này được sử dụng để cải thiện trải nghiệm của bạn và cung cấp các tính năng cá nhân hóa.
        </Text>

        <Text style={styles.sectionHeader}>2. Sử dụng thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi sử dụng thông tin của bạn để:
          {'\n'} • Cung cấp và duy trì dịch vụ
          {'\n'} • Cá nhân hóa trải nghiệm của bạn
          {'\n'} • Gửi thông báo quan trọng
          {'\n'} • Cải thiện ứng dụng
        </Text>

        <Text style={styles.sectionHeader}>3. Bảo vệ thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi thực hiện các biện pháp bảo mật để bảo vệ thông tin của bạn khỏi truy cập, 
          sử dụng hoặc tiết lộ trái phép.
        </Text>

        <Text style={styles.sectionHeader}>4. Chia sẻ thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, 
          trừ khi được yêu cầu bởi pháp luật hoặc với sự đồng ý của bạn.
        </Text>

        <Text style={styles.sectionHeader}>5. Quyền của bạn</Text>
        <Text style={styles.paragraph}>
          Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình. 
          Liên hệ với chúng tôi nếu bạn muốn thực hiện các quyền này.
        </Text>

        <Text style={styles.sectionHeader}>6. Thay đổi chính sách</Text>
        <Text style={styles.paragraph}>
          Chúng tôi có thể cập nhật chính sách này theo thời gian. Chúng tôi sẽ thông báo cho bạn 
          về bất kỳ thay đổi quan trọng nào.
        </Text>

        <Text style={styles.sectionHeader}>7. Liên hệ</Text>
        <Text style={styles.paragraph}>
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, 
          vui lòng liên hệ: privacy@fitnessapp.com
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
    lineHeight: 24,
  },
});

export default PrivacyPolicy;