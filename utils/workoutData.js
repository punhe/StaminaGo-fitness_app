const workoutImages = {
  pushup: require("../assets/images/chongday.jpg"),
  squat: require("../assets/images/squat.jpg"),
  plank: require("../assets/images/plank.jpg"),
  lunges: require("../assets/images/lunges.jpg"),
  jumpingJacks: require("../assets/images/chongday.jpg"),
  burpees: require("../assets/images/burpees.jpg"),
  yoga: require("../assets/images/yoga.jpg"),
  running: require("../assets/images/running.jpg"),
};

export const workouts = [
  {
    id: "1",
    title: "Chống đẩy",
    description: "Tăng cường cơ tay và ngực",
    image: workoutImages.pushup,
    video:
      "https://videos.pexels.com/video-files/4804787/4804787-uhd_2560_1440_25fps.mp4", // Video mẫu cho chống đẩy
    instructions: `1. Đặt tay xuống sàn với vị trí rộng hơn vai một chút.
            2. Duỗi thẳng hai chân ra sau, cơ thể tạo thành một đường thẳng từ đầu đến chân.
            3. Hạ thấp người xuống, giữ khuỷu tay gần cơ thể, không để lưng bị cong.
            4. Đẩy ngược cơ thể lên trở lại vị trí ban đầu. 
            5. Lặp lại động tác từ 10-15 lần, thực hiện 3 set.`,
  },
  {
    id: "2",
    title: "Squat",
    description: "Tăng cường cơ chân và mông",
    image: workoutImages.squat,
    video:
      "https://videos.pexels.com/video-files/8027214/8027214-uhd_2732_1440_25fps.mp4", // Video mẫu cho squat
    instructions: `1. Đứng thẳng, hai chân rộng bằng vai, ngón chân hơi chếch ra ngoài.
            2. Hạ thấp người xuống như đang ngồi trên một chiếc ghế tưởng tượng, đầu gối không vượt quá mũi chân.
            3. Giữ lưng thẳng, đẩy hông ra sau.
            4. Đẩy gót chân và đứng thẳng trở lại vị trí ban đầu.
            5. Lặp lại động tác từ 10-15 lần, thực hiện 3 set.`,
  },
  {
    id: "3",
    title: "Plank",
    description: "Tăng cường cơ bụng và lưng",
    image: workoutImages.plank,
    video:
      "https://videos.pexels.com/video-files/4325592/4325592-uhd_2732_1440_25fps.mp4", // Video mẫu cho plank
    instructions: `1. Nằm sấp và đặt khuỷu tay ngay dưới vai.
            2. Đẩy người lên bằng mũi chân và khuỷu tay, giữ cơ thể thẳng từ đầu đến gót chân.
            3. Siết chặt cơ bụng, không để lưng võng.
            4. Giữ tư thế này trong 30-60 giây, thở đều và không di chuyển.
            5. Nghỉ 30 giây, lặp lại 3 lần.`,
  },
  {
    id: "4",
    title: "Lunges",
    description: "Tăng cường cơ chân và mông",
    image: workoutImages.lunges,
    video:
      "https://videos.pexels.com/video-files/6326756/6326756-hd_1080_1920_25fps.mp4", // Video mẫu cho lunges
    instructions: `1. Đứng thẳng, bước một chân về phía trước khoảng 60-90 cm.
            2. Hạ thấp cơ thể, đầu gối chân trước vuông góc với mặt đất, đầu gối chân sau gần chạm sàn.
            3. Đẩy gót chân trước để đứng dậy và trở về vị trí ban đầu.
            4. Thực hiện 10-12 lần cho mỗi chân, sau đó đổi chân.
            5. Thực hiện 3 set cho mỗi chân.`,
  },
  {
    id: "5",
    title: "Jumping Jacks",
    description: "Đốt cháy calo và tăng cường sức bền",
    image: workoutImages.jumpingJacks,
    video:
      "https://videos.pexels.com/video-files/4859226/4859226-uhd_2560_1440_25fps.mp4", // Video mẫu cho jumping jacks
    instructions: `1. Đứng thẳng với hai chân sát nhau, tay để dọc theo thân người.
            2. Nhảy lên và dang hai chân ra đồng thời đưa hai tay lên cao qua đầu.
            3. Nhảy trở lại vị trí ban đầu, thu chân về và hạ tay xuống.
            4. Lặp lại động tác liên tục trong 20-30 lần.
            5. Thực hiện 3 set, nghỉ 30-45 giây giữa các set.`,
  },
  {
    id: "6",
    title: "Burpees",
    description: "Bài tập toàn thân giảm mỡ",
    image: workoutImages.burpees,
    video:
      "https://videos.pexels.com/video-files/8858142/8858142-uhd_2560_1440_25fps.mp4", // Video mẫu cho burpees
    instructions: `1. Bắt đầu ở tư thế đứng thẳng.
            2. Hạ người xuống và chống tay lên sàn, nhảy ra tư thế plank.
            3. Thực hiện một động tác hít đất.
            4. Nhảy chân trở lại gần tay và bật nhảy cao lên, đưa tay lên trên.
            5. Lặp lại 10-15 lần, thực hiện 3 set.`,
  },
  {
    id: "7",
    title: "Yoga",
    description: "Cải thiện sự linh hoạt và thăng bằng",
    image: workoutImages.yoga,
    video:
      "https://videos.pexels.com/video-files/992694/992694-hd_1920_1080_25fps.mp4", // Video mẫu cho yoga
    instructions: `1. Bắt đầu với tư thế đứng thẳng, hai chân rộng bằng hông.
            2. Thực hiện các động tác kéo giãn cơ, như tư thế cây, tư thế chiến binh.
            3. Tập trung vào việc thở sâu và giữ thăng bằng.
            4. Duy trì mỗi tư thế từ 30-60 giây, thở đều và giữ bình tĩnh.
            5. Thực hiện 3-5 tư thế liên tục, mỗi set kéo dài 10-15 phút.`,
  },
  {
    id: "8",
    title: "Chạy bộ",
    description: "Tăng cường sức khỏe tim mạch",
    image: workoutImages.running,
    video:
      "https://videos.pexels.com/video-files/3125907/3125907-uhd_2560_1440_25fps.mp4", // Video mẫu cho chạy bộ
    instructions: `1. Khởi động bằng cách đi bộ nhanh trong 5-10 phút.
            2. Chạy ở tốc độ chậm trong 5 phút để cơ thể làm quen.
            3. Tăng dần tốc độ và duy trì chạy ở tốc độ vừa phải trong 20-30 phút.
            4. Kết thúc bằng cách chạy chậm và đi bộ để làm mát trong 5-10 phút.
            5. Tăng dần cường độ và thời gian chạy theo từng tuần.`,
  },
];
