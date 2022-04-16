import { Animated, StyleSheet, View, Dimensions, Image } from "react-native";
import React, { FC } from "react";
import { Events } from "../types/data";
import { Images } from "../types/types";
import Typography from "./components/Typography";
import Icon from "@expo/vector-icons/Ionicons";
const { width } = Dimensions.get("window");

const SPACING = 10;
const WIDTH = width * 0.6;
const SPACER = (width - WIDTH) / 2;

const Home: FC = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [events, setEvent] = React.useState<any>([
    { id: 20 },
    ...Events,
    { id: 30 }
  ]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={events}
        contentContainerStyle={{ alignItems: "center" }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } }
            }
          ],
          {
            useNativeDriver: false
          }
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={WIDTH}
        horizontal
        decelerationRate={0}
        renderItem={({ item, index }) => {
          if (!item.name) {
            return <View style={{ width: SPACER }} />;
          }

          const inputRange = [
            (index - 2) * WIDTH,
            (index - 1) * WIDTH,
            index * WIDTH
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp"
          });

          const translateImages = scrollX.interpolate({
            inputRange,
            outputRange: [-20, 10, -20]
          });

          const imagesOpactiy = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          });

          const rotateY = scrollX.interpolate({
            inputRange,
            outputRange: ["30deg", "0deg", "-30deg"]
          });

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-WIDTH * 0.7, 0, WIDTH * 0.7]
          });
          return (
            <Animated.View
              style={{
                width: WIDTH,
                transform: [
                  {
                    scale
                  },
                //   {
                //     rotateY
                //   }
                ]
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginHorizontal: SPACING,
                  elevation: 1,
                  
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 250,
                    elevation: 2,
                    overflow: "hidden",
                    borderRadius: 10,
                    backgroundColor:'#fff'
                  }}
                >
                  <Animated.Image
                    source={item.image}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      height: "100%",
                      transform: [
                        {
                          translateX
                        }
                      ]
                    }}
                  />
                  <View style={styles.actions}>
                    <View style={styles.views}>
                      <Icon name="eye" color="#fff" size={15} />
                      <Typography text={item.views} color="#fff" />
                    </View>
                    <View style={styles.views}>
                      <Icon name="heart-outline" color="#fff" size={15} />
                      <Typography text={item.likes} color="#fff" />
                    </View>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Animated.View
                    style={{
                      ...styles.alignment,
                      marginVertical: translateImages,
                      opacity: imagesOpactiy
                    }}
                  >
                    <Image source={item.userImage} style={styles.userImage} />
                    <View
                      style={{
                        ...styles.alignment,
                        width: "80%"
                      }}
                    >
                      {item.images.map((i: Images) => (
                        <Image
                          source={i.image}
                          style={{ width: 30, height: 30, borderRadius: 5 }}
                        />
                      ))}
                    </View>
                  </Animated.View>
                  <Typography
                    text={`${item.location} . ${item.experience} Day experience`}
                    size={13}
                    color="#777"
                    style={{
                      marginTop: 20
                    }}
                  />
                  <Typography
                    text={item.name}
                    size={16}
                    bold
                    style={{
                      marginBottom: 10,
                      marginTop: 5
                    }}
                  />
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 30
        }}
      >
        <Animated.FlatList
          data={events}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } }
              }
            ],
            {
              useNativeDriver: false
            }
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            if (!item.name) {
              return null;
            }

            const inputRange = [
              (index - 2) * WIDTH,
              (index - 1) * WIDTH,
              index * WIDTH
            ];

            const page = scrollX.interpolate({
              inputRange,
              outputRange: [6, 20, 6],
              extrapolate: "clamp"
            });

            const color = scrollX.interpolate({
              inputRange,
              outputRange: ["#ccc", "blue", "#ccc"],
              extrapolate: "clamp"
            });

            return (
              <Animated.View
                style={{
                  width: page,
                  backgroundColor: color,
                  height: 6,
                  alignSelf: "center",
                  borderRadius: 10,
                  marginLeft: 3
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    alignItems: "center"
  },
  alignment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  actions: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%"
  },
  views: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%"
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "#ddd"
  }
});
