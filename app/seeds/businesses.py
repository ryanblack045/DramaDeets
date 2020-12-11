from app.models import db, Business



def seed_businesses():

    BobKrakower = Business(user_id=1, name="Bob Krakower", description="Bob Krakower teaches on camera training out of One On One Studios and has a variety of levels of training",
    lat="40.744320", lng="-73.988230", address="34 W 27th Street, 11th Floor", city="New York", state="NY", zipcode="10001", website="http://www.bobkrakower.com/classes.html", contact="BobKrakower@gmail.com", imgURL="https://www.juilliard.edu/sites/default/files/styles/square_808x708/public/2019-06/krakower-2_2400x1350.jpg?itok=foIs9SSd")
    BarrowGroup = Business(user_id=2, name="The Barrow Group", description="The Barrow Group has their own approach to the art of acting. This theatre company/school offers a wide range of classes for actors of all levels.",
    lat="40.75377", lng="-73.9932", address="312 W 36th St 3rd floor", city="New York", state="NY", zipcode="10018", website="https://www.barrowgroup.org/", contact="212.760.2615", imgURL="https://yt3.ggpht.com/ytc/AAUvwnhzyNiqCNrZ_rbbPW2dwky3Meekpscmao_7zYUxAA=s900-c-k-c0x00ffffff-no-rj")
    StephanieNaru = Business(user_id=3, name="Stephanie Naru", description="Stephanie Naru is a photographer/yoga instructor based out of NYC",
    lat="40.69246", lng="	-73.99036", address="", city="Brooklyn", state="NY", zipcode="11201", website="http://www.stephanienaruphoto.com/", contact="http://www.stephanienaruphoto.com/", imgURL="https://format-com-cld-res.cloudinary.com/image/private/s--Tp5sg5U_--/c_limit,g_center,h_65535,w_1600/fl_keep_iptc.progressive,q_95/v1/df82dccdab7f29e4a569401a715f6baa/elise_edit-4.jpg" )
    DavidNoles = Business(user_id=4, name="David Noles", description="David Noles is an NYC headshot photographer specializing in acting headshots in New York City, NY and Los Angeles.",
    lat="40.65707", lng="-74.00752", address="33 35th St", city="Brooklyn", state="NY", zipcode="11232", website="http://www.davidnoles.com/", contact="323.240.2969", imgURL="https://www.davidnoles.com/wp/wp-content/uploads/2013/10/headshots-nyc-new-york-city__lupita-393-500x750.jpg")
    WilliamEsper = Business(user_id=5, name="The William Esper Studio", description="The William Esper Studio, ranked as one of the best acting schools in the US, teaches Meisner based acting technique in New York City.",
    lat="40.753058", lng="-73.989653", address="208 W 37th St", city="New York", state="NY", zipcode="10018", website="https://esperstudio.com/", contact="212.904.1350", imgURL="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/52637321_2146063028822113_2999362403679862784_o.png?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=OTQZ063J6p8AX8gSGGz&_nc_ht=scontent-lga3-1.xx&oh=28f4d57ecf0083ca95512ac55ededc92&oe=5FFA6FA4" )

    db.session.add(BobKrakower)
    db.session.add(BarrowGroup)
    db.session.add(StephanieNaru)
    db.session.add(DavidNoles)
    db.session.add(WilliamEsper)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE ;')
    db.session.commit()
