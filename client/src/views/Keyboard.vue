<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <h1>Keyboard</h1>
    <hr>
    <button id="logout" v-on:click="logout">Выход</button>
    <div>
      <textarea v-model="text" id="textarea"></textarea>
      <div class="hint">
        <button v-on:click="printHint1" id="hint1"></button>
        <button v-on:click="printHint2" id="hint2"></button>
        <button v-on:click="printHint3" id="hint3"></button>
      </div>
      <KeyList
          v-if="menu2Text === '123'"
          v-bind:row_1_keys="row_1_keys"
          v-bind:row_2_keys="row_2_keys"
          v-bind:row_3_keys="row_3_keys"
          v-on:print-char="printChar"
          v-on:process-shift="processShift"
          v-on:remove-char="removeChar"
      />
      <SpecialListInMenu2
          v-else-if="menu2Text === 'abc' && menu3Text === '1/2'"
          v-bind:row_1_special_keys_in_menu_2="row_1_special_keys_in_menu_2"
          v-bind:row_2_special_keys_in_menu_2="row_2_special_keys_in_menu_2"
          v-bind:row_3_special_keys_in_menu_2="row_3_special_keys_in_menu_2"
          v-bind:menu3Text="menu3Text"
          v-on:count-number="processMenu3"
          v-on:print-char-process="printCharProcess"
          v-on:remove-char="removeChar"
      />
      <SpecialListInMenu3
          v-else-if="menu2Text === 'abc' && menu3Text === '2/2'"
          v-bind:row_1_special_keys_in_menu_3="row_1_special_keys_in_menu_3"
          v-bind:row_2_special_keys_in_menu_3="row_2_special_keys_in_menu_3"
          v-bind:row_3_special_keys_in_menu_3="row_3_special_keys_in_menu_3"
          v-bind:menu3Text="menu3Text"
          v-on:count-number="processMenu3"
          v-on:print-char-process="printCharProcess"
          v-on:remove-char="removeChar"
      />
      <div>
        <button v-on:click="processMenu2()" id="menu2">{{menu2Text}}</button>
        <button v-on:click="printCharProcess(' ')" id="space"></button>
        <button v-on:click="printCharProcess(',')" id="comma">,</button>
        <button v-on:click="printCharProcess('.')" id="dot">.</button>
        <button v-on:click="printCharProcess('\n')" id="enter">↲</button>
      </div>
    </div>
  </div>
</template>



<script>
import KeyList from '@/components/KeyList';
import SpecialList from '@/components/SpecialList'
import SpecialListInMenu2 from "@/components/SpecialListInMenu2";
import SpecialListInMenu3 from "@/components/SpecialListInMenu3";
import {
  checkForSpelling,
  extractLastWord, extractPenultimateWord,
  searchFirstSecondWords,
  searchWordCount,
  selectWordsToContinue,
} from '@/services/utils'
import {clearTextButtons, clearColorButtons} from '@/services/ft_clear'
import {printHintsContinue, printHintsSpelling} from "@/services/hints";
import {ft_process_shift} from "@/services/ft_process_shift";


export default {
  name: 'app',
  created() {
    this.user = this.$store.getters.getUser;
    if (this.user !== null)
    {
      this.$nextTick(async ()=>{
        await this.$store.dispatch('httpGetAllWords', [this.user.id, false]);
        await this.$store.dispatch('httpGetAllCollocations', [this.user.id, true]);
      })
    }
  },
  mounted() {
    clearTextButtons();
  },
  data() {
    return {
      row_special_keys: [
        {title: '!'},
        {title: '?'},
        {title: '.'},
        {title: ','}
      ],
      row_1_keys: [
        {title: 'й'},
        {title: 'ц'},
        {title: 'у'},
        {title: 'к'},
        {title: 'е'},
        {title: 'н'},
        {title: 'г'},
        {title: 'ш'},
        {title: 'щ'},
        {title: 'з'},
        {title: 'х'},
        {title: 'ъ'}
      ],
      row_2_keys: [
        {title: 'ф'},
        {title: 'ы'},
        {title: 'в'},
        {title: 'а'},
        {title: 'п'},
        {title: 'р'},
        {title: 'о'},
        {title: 'л'},
        {title: 'д'},
        {title: 'ж'},
        {title: 'э'},
        {title: 'ё'}
      ],
      row_3_keys: [
        {title: 'я'},
        {title: 'ч'},
        {title: 'с'},
        {title: 'м'},
        {title: 'и'},
        {title: 'т'},
        {title: 'ь'},
        {title: 'б'},
        {title: 'ю'}
      ],
      row_1_special_keys_in_menu_2: [
        {title: '1'},
        {title: '2'},
        {title: '3'},
        {title: '4'},
        {title: '5'},
        {title: '6'},
        {title: '7'},
        {title: '8'},
        {title: '9'},
        {title: '0'}
      ],
      row_2_special_keys_in_menu_2: [
        {title: '№'},
        {title: '@'},
        {title: '#'},
        {title: '$'},
        {title: '/'},
        {title: '^'},
        {title: '&'},
        {title: '*'},
        {title: '('},
        {title: ')'}
      ],
      row_3_special_keys_in_menu_2: [
        {title: '-'},
        {title: '\''},
        {title: '\"'},
        {title: ':'},
        {title: ';'},
        {title: '!'},
        {title: '?'}
      ],
      row_1_special_keys_in_menu_3: [
        {title: '+'},
        {title: '×'},
        {title: '÷'},
        {title: '='},
        {title: '<'},
        {title: '>'},
        {title: '{'},
        {title: '}'},
        {title: '['},
        {title: ']'}
      ],
      row_2_special_keys_in_menu_3: [
        {title: '€'},
        {title: '£'},
        {title: '¥'},
        {title: '§'},
        {title: '%'},
        {title: '~'},
        {title: '`'},
        {title: '¤'},
        {title: '☭'},
        {title: '★'}
      ],
      row_3_special_keys_in_menu_3: [
        {title: '_'},
        {title: '\\'},
        {title: '|'},
        {title: '«'},
        {title: '»'},
        {title: '¡'},
        {title: '¿'}
      ],
      user: null,
      state: 0,
      menu2Text: '123',
      menu3Text: '1/2',
      text: '',
      firstWordCorrectly: false,
      firstWord: '',
      secondWord: '',
    }
  },


  methods:
      {
        logout: function ()
        {
          this.$store.commit('deleteUser', null);
          this.$router.push('/');
        },


        printChar(title)
        {
          if (this.user === null)
          {
            this.text += title;
            return ;
          }
          if (document.getElementById('hint1').style.color === 'green')
          {
            const wordIdCount = searchWordCount(this.secondWord, this.$store.getters.getAllWordsByUserId);
            if (wordIdCount) {
              let arr = wordIdCount.split(':');
              this.$store.dispatch('httpPutWord', [arr[0], this.user.id, this.secondWord,
                (parseInt(arr[1]) + 1).toString()]);
              if (arr[1] === '2') {
                this.firstWordCorrectly = true;
              }
            } else {
              this.$store.dispatch('httpPostWord', [this.user.id, this.secondWord, 1]);
            }
            clearTextButtons();
            clearColorButtons();
          } else if (document.getElementById('hint1').style.color === 'blue') {
            clearTextButtons();
            clearColorButtons();
          }
          this.text += title;
          this.assignFirstSecondWords();
        },


        printCharProcess(title)
        {
          this.text += title
          if (this.user === null)
          {
            return ;
          }
          if (this.secondWord.length === 0
              || this.text.length - (this.text.lastIndexOf(this.secondWord) + this.secondWord.length) > 2)
          {
            return;
          }
          if (document.getElementById('hint1').style.color === 'green')
          {
            const wordIdCount = searchWordCount(this.secondWord, this.$store.getters.getAllWordsByUserId);
            if (wordIdCount)
            {
              let arr = wordIdCount.split(':');
              this.$store.dispatch('httpPutWord', [arr[0], this.user.id, this.secondWord, (parseInt(arr[1]) + 1).toString()]);
              if (arr[1] === '2')
              {
                this.firstWordCorrectly = true;
              }
            }
            else
            {
              this.$store.dispatch('httpPostWord', [this.user.id, this.secondWord, 1]);
            }
            clearTextButtons();
            clearColorButtons();
          }
          else if (document.getElementById('hint1').style.color !== 'blue')
          {
            let words = checkForSpelling(this.secondWord, this.$store.getters.getAllWordsByUserId);
            if (words) {
              this.firstWordCorrectly = false;
              printHintsSpelling(words);
            }
            else {
              if (this.firstWord !== '' && this.firstWordCorrectly)
              {
                this.reqPostPutCollocations(this.firstWord, this.secondWord);
              }
              words = selectWordsToContinue(this.secondWord, this.$store.getters.getAllCollocationsByUserId);
              printHintsContinue(words);
              this.firstWordCorrectly = true;
            }
          }
        },


        removeChar()
        {
          this.text = this.text.substring(0, this.text.length - 1);
          if (this.user === null)
            return ;
          clearTextButtons();
          clearColorButtons();
          this.assignFirstSecondWords();
          if (this.text === this.secondWord)
            this.firstWordCorrectly = false;
        },
        processShift()
        {
          this.state = ft_process_shift(this.state, this.row_1_keys, this.row_2_keys, this.row_3_keys);
        },
        processMenu2()
        {
          if (this.menu2Text === '123')
          {
            this.menu2Text = 'abc';
            this.menu3Text = '1/2';
          }
          else
          {
            this.menu2Text = '123';
            this.menu3Text = '1/2';
          }
        },
        processMenu3()
        {
          if (this.menu3Text === '1/2')
            this.menu3Text = '2/2';
          else
            this.menu3Text = '1/2';
        },


        printHint1()
        {
          this.printHintAny('hint1');
        },
        printHint2()
        {
          this.printHintAny('hint2');
        },
        printHint3()
        {
          this.printHintAny('hint3');
        },


        printHintAny(id)
        {
          if (document.getElementById(id).innerText !== '\"')
          {
            if (document.getElementById(id).style.color === 'green') {
              this.text = this.text.substring(0, this.text.length - this.secondWord.length - 1);
              this.secondWord = document.getElementById(id).innerText;
              this.text += this.secondWord;
              this.assignFirstSecondWords();
              let words = selectWordsToContinue(this.secondWord, this.$store.getters.getAllCollocationsByUserId);
              printHintsContinue(words);
            } else if (document.getElementById(id).style.color === 'blue') {
              this.firstWord = this.secondWord;
              this.secondWord = document.getElementById(id).innerText;
              this.text += this.secondWord;
              this.firstWordCorrectly = true;
            }
            if (this.firstWordCorrectly)
            {
              this.reqPostPutCollocations(this.firstWord, this.secondWord)
              this.assignFirstSecondWords();
              let words = selectWordsToContinue(this.secondWord, this.$store.getters.getAllCollocationsByUserId);
              printHintsContinue(words);
            }
          }
        },


        reqPostPutCollocations(firstWord, secondWord)
        {
          let json = searchFirstSecondWords(firstWord, secondWord, this.$store.getters.getAllCollocationsByUserId);
          if (json && JSON.parse(json).id !== 0)
          {
            this.$store.dispatch('httpPutCollocation', json);
            return 1;
          }
          if (!json)
          {
            this.$store.dispatch('httpPostCollocation', JSON.stringify({
              prevId: parseInt(searchWordCount(firstWord, this.$store.getters.getAllWordsByUserId).split(':')[0]),
              nextId: parseInt(searchWordCount(secondWord, this.$store.getters.getAllWordsByUserId).split(':')[0]),
              count: 1
            }));
            return 1;
          }
          return 0;
        },


        assignFirstSecondWords()
        {
          this.firstWord = extractPenultimateWord(this.text);
          this.secondWord = extractLastWord(this.text);
        }
      },
  components: {
    SpecialListInMenu3,
    SpecialListInMenu2,
    KeyList, SpecialList
  }
}
</script>


<style>

#menu2 {
  height: 40px;
  width: 40px;
  position: relative;
  bottom: 13px;

  background-color: #3366CC;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#menu2:active
{
  background-color: white;
}

#comma {
  height: 40px;
  width: 25px;
  position: relative;
  bottom: 13px;

  background-color: #555555;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#comma:active
{
  background-color: white;
}

#dot {
  height: 40px;
  width: 25px;
  margin: 7px 4px;
  position: relative;
  bottom: 13px;

  background-color: #555555;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#dot:active
{
  background-color: white;
}

#space {
  height: 40px;
  width: 180px;
  margin: 7px 4px;

  background-color: #AAAAAA;
  border: none;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#space:active
{
  background-color: white;
}

#enter {
  height: 40px;
  width: 35px;
  position: relative;
  bottom: 13px;

  background-color: #339966;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#enter:active
{
  background-color: white;
}

#textarea {
  height: 100px;
  width: 300px;
  margin-top: 100px;
}

.hint button {
  width: 100px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;

  background-color: white;
  border: 1px solid black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logout
{
  background-color: black;
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 12px;
  font-size: 13px;
}

#logout:active
{
  background-color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
