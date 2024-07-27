import React, {PropsWithChildren, useEffect, useState} from 'react';
import useUserStore from '../stores/userStore';
import {
  getSubscriptions,
  initConnection,
  requestSubscription,
} from 'react-native-iap';
import GradientBackground from '../components/common/GradientBackground';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../components/common/AppText';
import Constants from '../utils/Constants';
import {defaultStyles} from '../utils/DefaultStyles';
import {enumToReadableString} from '../utils/String';
import {Checkmark, XMark} from '../icons/svg';
import ClickableText from '../components/common/ClickableText';

const SubscriptionProvider: React.FC<PropsWithChildren> = props => {
  const me = useUserStore(state => state.me);

  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const checkForSubscription = async () => {
    try {
      await initConnection();
      const data = await getSubscriptions({
        skus: ['free_tier', 'standard_tier', 'standard_plus_tier'],
      });

      setSubscriptions([
        ...data,
        {
          productId: 'free_tier',
          title: 'Free tier',
        },
      ]);
    } catch (error) {
      console.error('Error fetching subscriptions', error);
    }
  };

  const handleSubscribe = async (productId: string) => {
    try {
      const data = await requestSubscription({
        sku: productId,
      });

      console.log('Subscription data', data);
    } catch (error) {
      console.error('Error subscribing', error);
    }
  };

  const getDetailsByProductId = (
    productId: string,
  ): {text: string; included: boolean}[] => {
    switch (productId) {
      case 'free_tier':
        return [
          {
            text: 'Max 5 workouts',
            included: true,
          },
          {
            text: 'Predefined exercises',
            included: true,
          },
          {
            text: 'Add custom exercises',
            included: false,
          },
          {
            text: 'Apple Health integration with calorie tracking',
            included: false,
          },
          {
            text: 'Live activity timer',
            included: false,
          },
          {
            text: 'Create and schedule programs',
            included: false,
          },
        ];
      case 'standard_tier':
        return [
          {
            text: 'Unlimited workouts',
            included: true,
          },
          {
            text: 'Add custom exercises',
            included: true,
          },
          {
            text: 'Apple Health integration with calorie tracking',
            included: true,
          },
          {
            text: 'Live activity timer',
            included: true,
          },
          {
            text: 'Create and schedule programs',
            included: false,
          },
        ];
      case 'standard_plus_tier':
        return [
          {
            text: 'Unlimited workouts',
            included: true,
          },
          {
            text: 'Add custom exercises',
            included: true,
          },
          {
            text: 'Apple Health integration with calorie tracking',
            included: true,
          },
          {
            text: 'Live activity timer',
            included: true,
          },
          {
            text: 'Create and schedule programs',
            included: true,
          },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (me?.id) {
      checkForSubscription();
    }
  }, [me]);

  return me?.subscription ? (
    <>{props.children}</>
  ) : (
    <GradientBackground styles={defaultStyles.flex1}>
      <ScrollView
        horizontal={true}
        decelerationRate={0.9}
        snapToInterval={340}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}>
        {subscriptions.map(subscription => (
          <TouchableOpacity
            style={styles.cardContainer}
            key={subscription.productId}>
            <View style={styles.cardInnerContainer}>
              <View>
                <AppText h4 centerText>
                  {subscription.title}
                </AppText>
                <View style={defaultStyles.marginTop50}>
                  {getDetailsByProductId(subscription.productId).map(
                    (detail, index) => (
                      <View
                        key={index}
                        style={[defaultStyles.row, defaultStyles.marginBottom]}>
                        <View style={defaultStyles.marginHorizontal}>
                          {detail.included ? (
                            <Checkmark />
                          ) : (
                            <View style={styles.marginLeft}>
                              <XMark />
                            </View>
                          )}
                        </View>
                        <AppText T2={!detail.included}>{detail.text}</AppText>
                      </View>
                    ),
                  )}
                </View>
              </View>
              <View style={[defaultStyles.spaceEvenly]}>
                {subscription.productId !== 'free_tier' ? (
                  <AppText xSmall>
                    {subscription.localizedPrice} per{' '}
                    {enumToReadableString(
                      subscription.subscriptionPeriodUnitIOS,
                    ).toLowerCase()}
                  </AppText>
                ) : (
                  <AppText xSmall>Free</AppText>
                )}
                <ClickableText
                  text={'Subscribe'}
                  onPress={() => handleSubscribe(subscription.productId)}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 400,
    margin: 20,
    alignSelf: 'center',
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  cardInnerContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  marginLeft: {
    marginLeft: 2,
  },
  subscribeButton: {
    width: 150,
  },
});

export default SubscriptionProvider;
