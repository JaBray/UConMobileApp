import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import Header from './Header';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE CONDUCT POLICY SCREEN
export default class ConductPolicy extends Component {
  constructor(props) {
    super(props);
  }

// TODO: add note about reporting violations through the app
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <Header title="Conduct Policy"/>
            <Text style={styles.text}>U-Con is dedicated to providing a safe convention experience for everyone. These policies apply to everyone attending U-Con.</Text>
            <Text style={styles.text}>Attempts to use the letter of a policy to defeat the purpose of the policy are unacceptable. Any pattern of behavior which is consistently barely within acceptable limits for individual actions is also unacceptable. In other words, do not be a rules lawyer.</Text>

            <Text style={styles.heading}>Sanctions</Text>
            <Text style={styles.text}>Attendees violating these rules may face sanctions up to and including expulsion from the convention without a refund, and/or being banned from future U-Con events. All sanctions are administered at the sole discretion of the U-Con organizers.</Text>

            <Text style={styles.heading}>Reporting Violations</Text>
            <Text style={styles.text}>Report any policy violations to a U-Con Volunteer or Staff member. While Volunteers and Staff can be found throughout the convention, there will always be Staff at Registration available to address policy violations. Volunteers and Staff members are required to promptly escalate reports of harassment, general misbehavior, or safety violations for resolution.</Text>
            <Text style={styles.text}>You can also report any violations through the Report Conduct Violation page of the U-Con App.</Text>

            <Text style={styles.heading}>Harassment</Text>
            <Text style={styles.text}>Do not harass anyone at U-Con, whether they are part of the con or present at the venue for other reasons, in any way. Harassment includes (but is not limited to) offensive verbal comments related to characteristics including gender, gender identity, gender expression, sexual orientation, disability, physical appearance, body size, race, veteran status, or religion; deliberate intimidation; stalking or following; harassing photography or recording; sustained disruption of events; inappropriate physical contact; and/or unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately. Even if you do not believe that your behavior is harassment, if the recipient does, you need to stop.</Text>
            <Text style={styles.text}>Whether the harasser stopped when told to cease and desist or not, it is still harassment under this policy and will be treated accordingly. Please report any violations of the harassment policy to Registration.</Text>

            <Text style={styles.heading}>Badge Swapping</Text>
            <Text style={styles.text}>Do not steal from the convention by allowing others to use your convention badge. We will confiscate badges from anyone we catch sharing or swapping badges, and they will be asked to leave the convention. U-Con is a not-for-profit organization run by volunteers; we break even over time but cannot tolerate theft.</Text>

            <Text style={styles.heading}>Smoking</Text>
            <Text style={styles.text}>Smoking is illegal in the function space. Ask your Gamemaster for a smoke break if you need one, and then go to a designated smoking area outside the facility.</Text>

            <Text style={styles.heading}>General Misbehavior</Text>
            <Text style={styles.text}>Do not engage in behavior which endangers the health or well-being of others, their property, or the relationship of U-Con to its host site. Please remember that you are in a public space, and you should treat other people and their belongings and the facility in which U-Con is held and its staff with respect.</Text>

            <Text style={styles.heading}>Costumes & Weapons Policies and Guidelines</Text>
            <Text style={styles.text}>Costumes and cosplay, as with any item or activity at the convention, must not harm, mar, or leave residue on other persons or the venue’s surfaces.</Text>
            <Text style={styles.text}>Venue policy permits on-duty law enforcement to carry weapons; all other functional weapons are prohibited at U-Con. Bladed and/or edged weapons, bludgeoning weapons, firearms (real, realistic, or replica), or water guns are not permitted. Firing projectiles of any sort, including Nerf, is prohibited. Arrows (or equivalent) are allowed if all are tied together and secured in a container (such as a quiver). Open flames, lasers (except laser pointers), and gunpowder/explosives of any sort, including caps, are prohibited. This list is not all-inclusive.
                Futuristic prop weapons, fantasy weapons which cannot do actual damage, and non-projectile boffer weapons are allowed provided they are not handled in a careless, threatening, or destructive manner against persons or property. Realistic-looking weapon props must be approved by convention staff at Ops/Registration. Approval may require peacebonding.
                Please bring all prop weapons to Ops/Registration during operating hours to be checked for compliance. Prop approval (including any requirements for peacebonding) is at the sole discretion of U-Con.</Text>
            <Text style={styles.text}>Nothing in this policy forbids the carrying of staffs or walking sticks as part of a costume, though they may require peacebonding, and they must not be used in a threatening manner.</Text>
            <Text style={styles.text}>Failure to comply with these policies and/or the instructions of U-Con Staff may result in immediate removal from the convention without refund.</Text>

            <Text style={styles.heading}>Policy on Children and Minors at U-Con</Text>
            <Text style={styles.text}>Children under age 7 may receive a free “child weekend” badge with the purchase of an accompanying adult badge.</Text>
            <Text style={styles.text}>Parents/guardians of children 7-12 may purchase a discounted “child weekend” badge when an accompanying adult badge is purchased.</Text>
            <Text style={styles.text}>Minors 13-17 must purchase an adult badge.</Text>
            <Text style={styles.text}>Children under age 13 must be accompanied by an adult at all times. Parents of children 13-17 will remain on site and/or be easily and quickly available on site in case of need. Please provide contact information on the back of the child’s badge in case emergency or accidental separation.</Text>
            <Text style={styles.text}>Gamemasters (GMs) have provided age guidelines for their events. GMs have discretion on whether they invite or allow children younger than the published age for their event. They are not required to do so. GMs are encouraged to be considerate of their ticketed players when making such decisions.</Text>
            <Text style={styles.text}>If a ticketed player decides not to participate as a result of GM allowing a younger player than described by the published age guideline, they can request a refund or trade for equivalent value generic tickets at Registration. Refunds or exchanges will not be given after the event has ended.</Text>
            <Text style={styles.text}>GMs also have discretion whether to allow caregivers to leave the immediate vicinity of their child at the risk of the parent or guardian when explicitly arranged with the GM at or before the start of the event.</Text>
            <Text style={styles.boldtext}>At no time is U-Con, its gamemasters, volunteers, or staff responsible for your child. If you or your caregiver choose to separate from your child (whether across the room or down the hall), that is at your own risk as a parent.</Text>
            <Text style={styles.text}>Gamemasters with disruptive players (whether adults or children) should contact U-Con staff. U-Con has policies regarding misbehavior and harassment that may result in dismissal from the convention without refund.</Text>
            <Text style={styles.text}>In the case of disruptive children, we will contact the parent, guardian, and/or caregiver to discuss the situation. If the disruption is serious or ongoing, the parent, guardian, or caregiver will be asked to remove the child from the convention space without refund. The parent, guardian, or caregiver may return after the child has been removed from the convention and care arranged elsewhere.</Text>
            <Text style={styles.text}></Text>
        </ScrollView>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
 },
  heading: {
    margin: 15,
    marginBottom: 0,
    fontSize: 26,
    fontWeight: "bold"
 },
  text: {
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16
  },
  boldtext: {
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold"
  }
});

