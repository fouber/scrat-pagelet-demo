function getItems(page, callback){
    var list = {
        inbox: [
            {
                "_id": "55333be2f2bc22c1c40b661d",
                "status": "read",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Aisha Delacruz",
                "subject": "Temple Court",
                "desc": "Officia sint labore ullamco veniam tempor occaecat do. Magna sunt qui Lorem Lorem est occaecat ea Lorem sunt voluptate sint ipsum."
            },
            {
                "_id": "55333be21489942e893f7744",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Spence Holt",
                "subject": "Brightwater Avenue",
                "desc": "Cupidatat est pariatur ullamco ad ut esse. Laboris proident voluptate quis ipsum sit non esse veniam."
            },
            {
                "_id": "55333be252c59fe975776478",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/tilo-avatar.png",
                "name": "Rosalind Valencia",
                "subject": "Seigel Court",
                "desc": "Voluptate id adipisicing Lorem sunt quis tempor cillum eiusmod sint culpa velit voluptate cupidatat. Pariatur reprehenderit voluptate aliquip cupidatat quis ut tempor pariatur officia non fugiat aliqua dolor."
            },
            {
                "_id": "55333be2943665f2877122a7",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Nell Clements",
                "subject": "Hudson Avenue",
                "desc": "Minim id sunt anim do incididunt officia dolor aliqua mollit esse occaecat proident. Quis do culpa commodo proident qui nulla laboris."
            },
            {
                "_id": "55333be22606ddd47b4b22da",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Hilda Banks",
                "subject": "Clifford Place",
                "desc": "Consequat mollit in qui irure. Excepteur velit Lorem sint sit veniam."
            },
            {
                "_id": "55333be2c5c293e3e32a157b",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Koch Ashley",
                "subject": "Orient Avenue",
                "desc": "Consequat aliquip fugiat sunt velit sint ipsum occaecat laboris excepteur amet. Sit do ullamco ex magna irure ad veniam."
            },
            {
                "_id": "55333be2805da78ce6c3e7d5",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Cooper Lewis",
                "subject": "Dewey Place",
                "desc": "Est do qui enim aliquip cillum nisi deserunt occaecat et consectetur nostrud. Exercitation ut eu sint in est excepteur labore incididunt occaecat incididunt."
            },
            {
                "_id": "55333be2417be4dc2f7e194c",
                "status": "read",
                "avatar": "http://purecss.io/img/common/ericf-avatar.png",
                "name": "Blanca Fischer",
                "subject": "Lefferts Place",
                "desc": "Ad elit et consectetur commodo exercitation enim laboris. Quis nostrud minim nostrud dolore cupidatat voluptate dolor."
            },
            {
                "_id": "55333be2659eb01af38eaa3e",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ericf-avatar.png",
                "name": "Bryant Mcmillan",
                "subject": "Louis Place",
                "desc": "Do Lorem cillum cillum duis in esse exercitation cillum ut consectetur ex ipsum. Excepteur incididunt minim do reprehenderit ipsum pariatur culpa est officia Lorem."
            },
            {
                "_id": "55333be2769e04fb2b00b5b4",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Landry Henry",
                "subject": "Dunne Court",
                "desc": "Ex aliqua ex ullamco irure non excepteur non enim ad ea cupidatat ad sint excepteur. Mollit incididunt nulla consectetur tempor dolore laborum sunt."
            },
            {
                "_id": "55333be2a8f9557bbd489df2",
                "status": "read",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Alba Haley",
                "subject": "Church Lane",
                "desc": "Laborum in excepteur nisi non ad occaecat cupidatat veniam aliquip sunt. Exercitation aliqua est consectetur et."
            }
        ],
        important: [
            {
                "_id": "55333c5da0e5fe45d43323df",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Johnston Ross",
                "subject": "Harway Avenue",
                "desc": "Duis ullamco esse ut dolore quis in adipisicing nisi. Et anim do elit tempor consectetur consectetur consequat nisi id adipisicing do."
            },
            {
                "_id": "55333c5d5f513ff3cdfe6087",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/tilo-avatar.png",
                "name": "Naomi Farmer",
                "subject": "Agate Court",
                "desc": "Tempor id culpa ex duis enim do culpa adipisicing labore excepteur. Sit dolore eu culpa duis do nulla."
            },
            {
                "_id": "55333c5dd40c0a3197a607c0",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Tyson Hale",
                "subject": "Madison Street",
                "desc": "Ullamco sit nostrud minim enim et anim adipisicing ea laborum. Deserunt elit deserunt esse aliqua sint eiusmod."
            },
            {
                "_id": "55333c5d91127ea2a1579b8f",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Molly Becker",
                "subject": "Boynton Place",
                "desc": "Ullamco ea est minim duis dolor. Incididunt nostrud aute pariatur deserunt incididunt aliqua Lorem do labore cupidatat."
            },
            {
                "_id": "55333c5dd3427092846bbae2",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Elsie Chang",
                "subject": "President Street",
                "desc": "Aliquip excepteur nisi laboris aute quis enim officia voluptate cillum. Anim dolor eu irure cillum reprehenderit anim aliqua."
            },
            {
                "_id": "55333c5d77fcf13c3374e546",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Dorthy Lloyd",
                "subject": "Fiske Place",
                "desc": "Ipsum mollit laborum labore irure aliquip tempor ex duis velit. Esse mollit elit consectetur labore esse ex et esse nisi anim magna ex."
            },
            {
                "_id": "55333c5da9088faaa9203050",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Esther Carroll",
                "subject": "Barwell Terrace",
                "desc": "Ex voluptate nostrud ea id adipisicing. Velit Lorem do quis commodo consequat."
            },
            {
                "_id": "55333c5d4b0fdf2ff34c2861",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Beatriz Sellers",
                "subject": "Frank Court",
                "desc": "Incididunt officia Lorem est anim mollit aliqua aliqua. Sit esse et cillum non ex duis amet ut."
            }
        ],
        sent: [
            {
                "_id": "55333c7c1a99b37518043ec6",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Briggs Potter",
                "subject": "Cox Place",
                "desc": "Consectetur exercitation magna pariatur reprehenderit cillum exercitation. Nostrud ullamco exercitation non esse reprehenderit anim dolor fugiat cillum fugiat minim aliqua sint sit."
            },
            {
                "_id": "55333c7cfae9f1fbc809bc33",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/tilo-avatar.png",
                "name": "Veronica Simon",
                "subject": "Tennis Court",
                "desc": "Dolore exercitation ut proident cillum nostrud anim. Ad adipisicing tempor cupidatat dolor minim magna ipsum quis do minim labore nisi culpa."
            },
            {
                "_id": "55333c7c516d03d02d140142",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Amelia Smith",
                "subject": "Cornelia Street",
                "desc": "Voluptate occaecat reprehenderit sint aute quis. Fugiat aliquip laboris dolore dolor."
            },
            {
                "_id": "55333c7c0204866ad37ed10b",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/andrew-avatar.png",
                "name": "Wolf Ruiz",
                "subject": "Wogan Terrace",
                "desc": "Dolor occaecat est proident ullamco irure reprehenderit pariatur qui irure do magna officia magna pariatur. Dolor tempor sint labore et in duis anim."
            },
            {
                "_id": "55333c7c9f3f97ab98829ff2",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Rush David",
                "subject": "Ridgecrest Terrace",
                "desc": "Eiusmod voluptate quis dolore consequat elit. Nisi amet enim est id duis Lorem est magna non elit do fugiat Lorem nostrud."
            },
            {
                "_id": "55333c7c6e77d9295aaeb957",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Mia Manning",
                "subject": "Hoyts Lane",
                "desc": "Et fugiat laborum laboris elit ullamco aute labore est adipisicing consectetur ea. Exercitation tempor ut voluptate ex."
            },
            {
                "_id": "55333c7cea354c10c4487b44",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Stefanie Carroll",
                "subject": "Monroe Place",
                "desc": "In tempor aute exercitation commodo reprehenderit occaecat dolore ex eiusmod excepteur do et dolor ipsum. Non sunt et do non id voluptate irure voluptate."
            },
            {
                "_id": "55333c7cfaadefb6bf1c4bd6",
                "status": "read",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Jenna Johnson",
                "subject": "Bayview Avenue",
                "desc": "Commodo eiusmod eiusmod dolor mollit. Fugiat quis sit magna laboris sint sunt proident dolor sunt elit et sunt."
            },
            {
                "_id": "55333c7c56939975bf79e56a",
                "status": "read",
                "avatar": "http://purecss.io/img/common/andrew-avatar.png",
                "name": "Boone Austin",
                "subject": "Whitney Avenue",
                "desc": "Labore sint cillum do amet enim aliquip elit culpa pariatur ipsum sint non sit. Ad et voluptate est culpa in tempor consequat sit mollit quis non amet et sint."
            }
        ],
        drafts: [
            {
                "_id": "55333c9c27eb65e948a38842",
                "status": "read",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "Weber Henderson",
                "subject": "Polhemus Place",
                "desc": "Sit nisi aliqua aliquip laborum ea id laborum irure ullamco occaecat laboris. Elit mollit velit sit nisi sit Lorem."
            },
            {
                "_id": "55333c9c938ae11609e221d9",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Stella Santos",
                "subject": "Bleecker Street",
                "desc": "Non pariatur nisi do pariatur ipsum ad. Adipisicing Lorem laborum Lorem ad eu."
            },
            {
                "_id": "55333c9c20bab04d76c6b509",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Chelsea Ward",
                "subject": "Cumberland Street",
                "desc": "Officia nulla est pariatur enim reprehenderit incididunt excepteur officia adipisicing nisi cillum ex. Nisi nulla ullamco velit mollit aliquip aliquip laborum minim ea eu cupidatat laborum."
            },
            {
                "_id": "55333c9c6c3775040ae4729e",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Duffy Dominguez",
                "subject": "Jaffray Street",
                "desc": "Adipisicing do ad ut ipsum id enim qui labore velit. Cillum commodo commodo tempor esse eiusmod ea pariatur id."
            },
            {
                "_id": "55333c9cbc7efbb5ac1a69aa",
                "status": "read",
                "avatar": "http://purecss.io/img/common/ynews-avatar.png",
                "name": "West Hudson",
                "subject": "Elizabeth Place",
                "desc": "Fugiat et aute nulla occaecat voluptate labore et excepteur pariatur adipisicing aute ipsum proident anim. Nulla irure incididunt in veniam sint."
            },
            {
                "_id": "55333c9ce9fdadd4c170db5a",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Becker Douglas",
                "subject": "Krier Place",
                "desc": "Et amet voluptate minim tempor non amet adipisicing pariatur ut. Ex commodo minim eiusmod occaecat ex adipisicing commodo voluptate quis nisi do sint dolore velit."
            },
            {
                "_id": "55333c9cbc94efca65be6398",
                "status": "read",
                "avatar": "http://purecss.io/img/common/tilo-avatar.png",
                "name": "Meadows Pate",
                "subject": "Madison Street",
                "desc": "Nisi deserunt anim ullamco consectetur labore. Ad nulla nulla culpa adipisicing nostrud duis minim."
            },
            {
                "_id": "55333c9c1cee03bebc392c78",
                "status": "read",
                "avatar": "http://purecss.io/img/common/ericf-avatar.png",
                "name": "Concepcion Lancaster",
                "subject": "Elliott Place",
                "desc": "Ad do ut et aute commodo consequat dolore est. Cillum nostrud ullamco reprehenderit ad minim Lorem proident aliqua est velit."
            },
            {
                "_id": "55333c9cb64962f9324a5f1d",
                "status": "read",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Rosa Hardy",
                "subject": "Autumn Avenue",
                "desc": "Consectetur eu exercitation ea irure ut. Nulla qui enim culpa quis sunt exercitation."
            },
            {
                "_id": "55333c9cfec40ad388d94e65",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/tilo-avatar.png",
                "name": "Delgado Wagner",
                "subject": "Locust Avenue",
                "desc": "Sunt laborum elit sunt voluptate adipisicing officia ut. Ut enim consectetur ad do sit pariatur laboris excepteur consectetur Lorem et esse elit."
            }
        ],
        trash: [
            {
                "_id": "55333cb30a85307d524a2da0",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Ellis Whitehead",
                "subject": "Verona Place",
                "desc": "Proident ex velit ut nulla velit. Eu Lorem officia deserunt dolor enim ipsum eu minim magna."
            },
            {
                "_id": "55333cb39adc9ce7f28eb554",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ericf-avatar.png",
                "name": "Roberson Gill",
                "subject": "Freeman Street",
                "desc": "Officia ad incididunt exercitation ea dolor nulla ea. Nulla voluptate elit adipisicing pariatur."
            },
            {
                "_id": "55333cb3cc927a91831caeaa",
                "status": "read",
                "avatar": "http://purecss.io/img/common/yfinance-avatar.png",
                "name": "Juanita Merritt",
                "subject": "Veronica Place",
                "desc": "Pariatur labore id consectetur ullamco amet sunt ea do. Tempor aliqua consequat dolore ipsum do laborum culpa proident anim cillum nulla."
            },
            {
                "_id": "55333cb373b2bdbd091b70a3",
                "status": "read",
                "avatar": "http://purecss.io/img/common/reid-avatar.png",
                "name": "Stein Chase",
                "subject": "Dorchester Road",
                "desc": "Ullamco ut elit ut dolore pariatur aliquip ipsum magna voluptate dolore. Occaecat adipisicing commodo ex aliqua."
            },
            {
                "_id": "55333cb30f7d0ded14be1c1c",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/yui-avatar.png",
                "name": "Sonja Mooney",
                "subject": "Chauncey Street",
                "desc": "Sit irure incididunt qui ea pariatur reprehenderit mollit excepteur exercitation velit exercitation. Ad reprehenderit dolor reprehenderit ipsum laborum consectetur nostrud ipsum mollit culpa ea deserunt sunt."
            },
            {
                "_id": "55333cb33904811a9753b09f",
                "status": "read",
                "avatar": "http://purecss.io/img/common/andrew-avatar.png",
                "name": "Hansen Pittman",
                "subject": "Martense Street",
                "desc": "Aliquip ex anim tempor occaecat ut ipsum commodo ullamco est cupidatat. Sunt dolor ex veniam occaecat pariatur amet irure Lorem proident excepteur Lorem quis occaecat."
            },
            {
                "_id": "55333cb3e7b819802314eb94",
                "status": "read",
                "avatar": "http://purecss.io/img/common/andrew-avatar.png",
                "name": "Kerry Greer",
                "subject": "Garfield Place",
                "desc": "Anim anim in nostrud dolore tempor anim enim consequat. Et duis tempor Lorem cupidatat officia."
            },
            {
                "_id": "55333cb396f9d8ff415c1b96",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/tilo-avatar.png",
                "name": "Rogers Ayers",
                "subject": "Howard Alley",
                "desc": "Eu laborum occaecat Lorem incididunt ex nisi dolore in officia. Velit voluptate magna ea culpa sunt."
            },
            {
                "_id": "55333cb3ce74b60c03cdebb7",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/ericf-avatar.png",
                "name": "Ferguson Duncan",
                "subject": "Gatling Place",
                "desc": "Aliquip dolore sint anim officia aute ut mollit mollit. Do dolor amet sit ex Lorem amet dolor aute enim est."
            },
            {
                "_id": "55333cb35ed3764174f4c584",
                "status": "unread",
                "avatar": "http://purecss.io/img/common/andrew-avatar.png",
                "name": "Sophia Parrish",
                "subject": "Maujer Street",
                "desc": "Laboris nulla excepteur cillum dolore cillum excepteur aliquip cupidatat aliquip eu. Deserunt veniam elit dolore ex magna nulla cupidatat exercitation anim elit ipsum nulla."
            }
        ]
    };
    callback(list[page]);
}

module.exports = function(page, selected, callback){
    getItems(page, function(items){
        var is404 = false;
        if(typeof items === 'undefined'){
            is404 = true;
        } else if(selected) {
            items.forEach(function(item){
                if(item._id == selected){
                    item.status = 'selected';
                }
            });
        }
        callback(is404, items);
    });
};